let express = require('express');
let router = express.Router();
let BetModel = require('../models/bet');
let UserModel = require('../models/user');
let jwt = require('jsonwebtoken');
let amqp = require('amqplib');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');
let global_odds = [];
let event_status = '';

function setInfo(odds, status) {
    global_odds = odds;
    event_status = status;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.post('/bets', async (req, res) => {

    console.log(req.body);

    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let user_id = -1;

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
            user_id = decoded.user_id;

        } catch (e) {
            console.log(e);
            return res.status(401).send('Missing auth token');
        }

        if (req.body.command === 'getBets') {

            if (!req.body.role) {

                return res.status(401).send('Missing role field');

            } else {

                if (req.body.role === 'admin') {

                    // list all bets
                    BetModel.find({}, {_id: 0, __v: 0})
                        .then(doc => {
                            return res.json(doc);
                        });

                }

                if (req.body.role === 'user') {

                    // list bets by id
                    BetModel.find({user_id: user_id}, {_id: 0, __v: 0})
                        .then(doc => {
                            return res.json(doc);
                        });

                }

            }
        }

        if (req.body.command === 'cashout') {

            let bet_amount = 0;

            if (req.body.bet_id) {

            }

            await BetModel.findOne({bet_id: req.body.bet_id})
                .then(doc => {
                    bet_amount = doc.amount;
                });

            BetModel.remove({bet_id: req.body.bet_id}, async function (error) {
                if (!error) {

                    await UserModel.findOne({ user_id: user_id }, function (err, doc) {
                        doc.balance = doc.balance + (bet_amount / 2);
                        doc.save();
                    });

                    BetModel.find({user_id: user_id}, { _id: 0, __v:0})
                        .then(async doc => {

                            return res.json(doc);
                        });

                }
            })

        }

        if (req.body.command === 'postBet') {

            let user_balance = -1;

            await UserModel.findOne({user_id: user_id})
                .then(doc => {
                    user_balance = doc.balance;
                });

            let bet_amount = -1;

            if (req.body.amount) {
                bet_amount = req.body.amount;
            } else {
                return res.status(400).send('Missing bet amount.');
            }

            console.log('user balance: ' + user_balance);
            console.log('bet amount: ' + bet_amount);

            if (user_balance > bet_amount && req.body.event_id) {
            //
            //     try {
            //         let requests_queue = 'requests_e_t_s_l_service';
            //         let responses_queue = 'responses_e_t_s_l_service';
            //
            //         // connect to Rabbit MQ and create a channel
            //         const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');
            //
            //         const channel = await connection.createChannel();
            //
            //         await channel.assertQueue(requests_queue, {
            //             durable: false
            //         });
            //
            //         await channel.sendToQueue(requests_queue, Buffer.from('requestEventInfo:' + ev_id));
            //         console.log('message sent!');
            //
            //         await channel.sendToQueue(requests_queue, Buffer.from('closeEvent:' + ev_id + ';' + ev_result));
            //         console.log('message sent!');
            //
            //         await channel.assertQueue(responses_queue, {
            //             durable: false
            //         });
            //
            //         let odds = [];
            //
            //         await channel.consume(responses_queue, function(msg) {
            //             let message = msg.content.toString();
            //             let splitted_message = message.split(':');
            //
            //             if (splitted_message[0] === 'responseEventInfo') {
            //                 let odds_splitted = splitted_message[1].split(';');
            //
            //                 odds[0] = parseFloat(odds_splitted[0]);
            //                 odds[1] = parseFloat(odds_splitted[1]);
            //                 odds[2] = parseFloat(odds_splitted[2]);
            //
            //                 console.log('teste dentro async ' + odds);
            //
            //                 setInfo(odds, odds_splitted[3]);
            //
            //                 connection.close();
            //             }
            //         }, {
            //             noAck: true
            //         });
            //
            //         // await channel.consume(responses_queue, (msg) => {
            //         //     console.log(" [x] Received %s", msg.content.toString());
            //         //     let message = msg.content.toString();
            //         //     let splitted_message = message.split(':');
            //         //
            //         //     if (splitted_message[0] === 'responseEventInfo') {
            //         //         let odds_splitted = splitted_message[1].split(';');
            //         //
            //         //         odds[0] = parseFloat(odds_splitted[0]);
            //         //         odds[1] = parseFloat(odds_splitted[1]);
            //         //         odds[2] = parseFloat(odds_splitted[2]);
            //         //
            //         //         console.log('teste dentro async ' + odds);
            //         //
            //         //         return Promise.resolve(odds);
            //         //     }
            //         // }, {
            //         //     noAck: true
            //         // });
            //
            //     } catch (e) {
            //         console.log(e);
            //     }
            //
            //     while ( event_status === '') {
            //         await sleep(500);
            //         console.log('sleeping');
            //     }
            //
            //     console.log('recebeu o status');
            //
            //     if (event_status === 'open') {

                    let model = new BetModel({
                        amount: req.body.amount,
                        result: req.body.result,
                        user_id: user_id,
                        event_id: req.body.event_id
                    });
                    model.save()
                        .then(doc => {
                            if (!doc || doc.length === 0) {
                                return res.status(500).send(doc);
                            }

                            BetModel.find({}, { _id: 0, __v:0})
                                .then(doc => {

                                    UserModel.findOne({ user_id: user_id }, function (err, doc) {

                                        if (doc !== null) {
                                            console.log('alterando o balance');
                                            doc.balance = doc.balance - bet_amount;
                                            doc.save();
                                        }

                                    });

                                    return res.json(doc);
                                });
                        })
                        .catch(err => {
                            return res.status(500).json(err);
                        });

                // } else {
                //     return res.status(500).send('Event already closed');
                // }
            } else {
                return res.status(500).send('Missing event_id or no balance to bet')
            }
        }
    }
});

router.get('/bets', (req, res) => {

    //fazer a verificação se é um admin ou não autenticado e retornar todas as bets ou apenas as referentes ao user

    let user_id = -1;

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;

        try{
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
            user_id = decoded.user_id;
        } catch (e) {
            console.log(e);
            return res.status(401).send('Missing auth token');
        }

        if (!req.body.role) {

            return res.status(401).send('Missing role field');

        } else {

            if (req.body.role === 'admin') {

                // list all bets
                BetModel.find({}, {_id: 0, __v: 0})
                    .then(doc => {
                        return res.json(doc);
                    });

            }

            if (req.body.role === 'user') {

                // list bets by id
                BetModel.find({user_id: user_id}, {_id: 0, __v: 0})
                    .then(doc => {
                        return res.json(doc);
                    });

            }

        }
    }
});

module.exports = router;