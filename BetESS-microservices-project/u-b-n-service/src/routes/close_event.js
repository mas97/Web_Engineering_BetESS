let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let NotificationModel = require('../models/notification');
let BetModel = require('../models/bet');
let amqp = require('amqplib');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');
let global_odds;
let event_status;

/* Returns doc w/ unpaid bets */
function getBets() {
    return new Promise((resolve, reject) => {
        BetModel.find({paid: false}, { _id: 0, __v:0})
        .then( doc => {
            resolve(doc);
        });
    });
}

function setInfo(odds, status) {
    global_odds = odds;
    event_status = status;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.post('/close_event', async (req, res) => {

    console.log(req.body);

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
        } catch (e) {
            console.log(e);
            return res.status(401).send('Invalid authentication token');
        }

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send('Request body is missing');
        }

        if (req.body.hasOwnProperty('event_id') && req.body.hasOwnProperty('result')) {

            // corpo da msg param id_event
            let ev_id = req.body.event_id;
            let ev_result = req.body.result;
            // vars para dados de cada bet
            let amount = 0;
            let user_id = 0;
            let bets_unpaid;
            let user_balance = -1;
            let result_bet = '';

            console.log('a pedir resultados por mensagem');

            try {
                let requests_queue = 'requests_e_t_s_l_service';
                let responses_queue = 'responses_e_t_s_l_service';

                // connect to Rabbit MQ and create a channel
                const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

                const channel = await connection.createChannel();

                await channel.assertQueue(requests_queue, {
                    durable: false
                });

                await channel.sendToQueue(requests_queue, Buffer.from('requestEventInfo:' + ev_id));
                console.log('message sent!');

                await channel.assertQueue(responses_queue, {
                    durable: false
                });

                let odds = [];

                await channel.consume(responses_queue, function(msg) {
                    let message = msg.content.toString();
                    let splitted_message = message.split(':');

                    if (splitted_message[0] === 'responseEventInfo') {
                        let odds_splitted = splitted_message[1].split(';');

                        odds[0] = parseFloat(odds_splitted[0]);
                        odds[1] = parseFloat(odds_splitted[1]);
                        odds[2] = parseFloat(odds_splitted[2]);

                        console.log('teste dentro async ' + odds);

                        setInfo(odds, odds_splitted[3]);
                    }
                }, {
                    noAck: true
                });

                while (typeof global_odds === 'undefined' && typeof event_status === 'undefined') {
                    await sleep(500);
                    console.log('sleeping');
                }

                await channel.sendToQueue(requests_queue, Buffer.from('closeEvent:' + ev_id + ';' + ev_result));
                console.log('message sent!');

            } catch (e) {
                console.log(e);
            }

            console.log(global_odds);

            console.log('TESTE FINAL ODDS ' + global_odds + ' status: ' + event_status);

            // CHAMADAS - MISSING (completar)
            let odd_home = global_odds[0];
            let odd_draw = global_odds[1];
            let odd_away = global_odds[2];

            if (event_status === 'open') {

                console.log('status do event open');

                getBets().then(doc => {
                    console.log(doc);
                    bets_unpaid = doc;
                    console.log('bets unpaid' + bets_unpaid);

                    for (let i = 0; i < bets_unpaid.length; i++) {
                        console.log('inicio iteração');
                        console.log('bet_id: ' + bets_unpaid[i].bet_id);
                        console.log('event id: ' + ev_id);

                        if (bets_unpaid[i].event_id === ev_id) {
                            amount = bets_unpaid[i].amount;
                            user_id = bets_unpaid[i].user_id;
                            result_bet = bets_unpaid[i].result;

                            // console.log('bet_id: ' + bet.event_id);
                            // console.log('event id: ' + ev_id);
                            // console.log('amount: ' + amount);
                            // console.log('user_id: ' + user_id);
                            // console.log('result_bet: ' + result_bet);

                            UserModel.findOne({user_id: user_id}, {balance: 1}).then(doc => {
                                console.log('aceder ao saldo do user' + doc);
                                user_balance = parseFloat(doc);
                            });

                            console.log(result_bet);
                            console.log(ev_result);
                            if (result_bet === ev_result) {

                                if (ev_result === 'winHome') { // ----------------------------------------------------
                                    let entry = {
                                        status: 'unread',
                                        balancebet: amount * odd_home,
                                        event_id: ev_id,
                                        user_id: user_id
                                    };
                                    let notif = new NotificationModel(entry);
                                    notif.save();

                                    // UserModel.update(
                                    //     {user_id: user_id},
                                    //     {balance: user_balance + (amount * odd_home)}
                                    // );

                                    UserModel.findOne({ user_id: user_id }, function (err, doc) {

                                        if (doc !== null) {
                                            doc.balance = Number(doc.balance) + amount * odd_home;
                                            doc.save();
                                        }

                                    });

                                    // BetModel.update(
                                    //     {bet_id: bet.bet_id},
                                    //     {paid: true}
                                    // );

                                    BetModel.findOne({ bet_id: bets_unpaid[i].bet_id }, function (err, doc) {

                                        if (doc !== null) {
                                            doc.paid = true;
                                            doc.save();
                                        }

                                    });

                                }
                                if (ev_result === 'winAway') { // ----------------------------------------------------
                                    let entry = {
                                        status: 'unread',
                                        balancebet: amount * odd_away,
                                        event_id: ev_id,
                                        user_id: user_id
                                    };
                                    let notif = new NotificationModel(entry);
                                    notif.save();

                                    // UserModel.update(
                                    //     {id: user_id},
                                    //     // ir buscar o saldo do user : user_balance
                                    //     {balance: user_balance + (amount * odd_home)}
                                    // );

                                    UserModel.findOne({ user_id: user_id }, function (err, doc) {

                                        if (doc !== null) {
                                            doc.balance = Number(doc.balance) + amount * odd_away;
                                            doc.save();
                                        }

                                    });

                                    BetModel.findOne({ bet_id: bets_unpaid[i].bet_id }, function (err, doc) {

                                        if (doc !== null) {
                                            doc.paid = true;
                                            doc.save();
                                        }

                                    });

                                }
                                if (ev_result === 'draw') { // ----------------------------------------------------
                                    let entry = {
                                        status: 'unread',
                                        balancebet: amount * odd_draw ,
                                        event_id: ev_id,
                                        user_id: user_id
                                    };
                                    let notif = new NotificationModel(entry);
                                    notif.save();

                                    // UserModel.update(
                                    //     {id: user_id},
                                    //     // ir buscar o saldo do user : user_balance
                                    //     {balance: user_balance + (amount * odd_home)}
                                    // );

                                    UserModel.findOne({ user_id: user_id }, function (err, doc) {

                                        if (doc !== null) {
                                            doc.balance = Number(doc.balance) + amount * odd_draw;
                                            doc.save();
                                        }

                                    });

                                    // BetModel.update(
                                    //     {id: bet.bet_id},
                                    //     {paid: true}
                                    // );

                                    BetModel.findOne({ bet_id: bets_unpaid[i].bet_id }, function (err, doc) {

                                        if (doc !== null) {
                                            doc.paid = true;
                                            doc.save();
                                        }

                                    });
                                }
                            } else {

                                let entry = {
                                    status: 'unread',
                                    balancebet: -amount ,
                                    event_id: ev_id,
                                    user_id: user_id
                                };
                                let notif = new NotificationModel(entry);
                                notif.save();

                                BetModel.findOne({ bet_id: bets_unpaid[i].bet_id }, function (err, doc) {

                                    if (doc !== null) {
                                        doc.paid = true;
                                        doc.save();
                                    }

                                });

                            }
                        }
                    }
                });
            } else {
                return res.status(400).send('Event with id nº ' + ev_id + ' is already closed.')
            }
            return res.status(200).send('Event with id nº ' + ev_id + ' closed!')
        }
    }
});

module.exports = router;