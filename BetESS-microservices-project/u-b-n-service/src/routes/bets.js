let express = require('express');
let router = express.Router();
let BetModel = require('../models/bet');
let UserModel = require('../models/user');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');
let event_status;

function setInfo(status) {
    event_status = status;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.post('/bets', async (req, res) => {

    let user_id = -1;

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);

        } catch (e) {
            console.log(e);
            return res.status(401).send('Missing auth token');
        }

        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        let user_balance = -1;

        UserModel.findOne({user_id: user_id})
            .then(doc => {
                user_balance = parseFloat(doc.balance);
            });

        let bet_amount = -1;

        if (req.body.amount) {
            bet_amount = parseFloat(req.body.amount);
        } else {
            return res.status(400).send('Missing bet amount.');
        }

        if (user_balance > bet_amount && req.body.event_id) {

            try {
                let requests_queue = 'requests_e_t_s_l_service';
                let responses_queue = 'responses_e_t_s_l_service';

                // connect to Rabbit MQ and create a channel
                const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

                const channel = await connection.createChannel();

                await channel.assertQueue(requests_queue, {
                    durable: false
                });

                await channel.sendToQueue(requests_queue, Buffer.from('requestEventStatus:' + req.body.event_id));
                console.log('message sent!');

                await channel.assertQueue(responses_queue, {
                    durable: false
                });

                await channel.consume(responses_queue, function(msg) {
                    let message = msg.content.toString();
                    let splitted_message = message.split(':');

                    if (splitted_message[0] === 'responseEventStatus') {

                        setInfo(splitted_message[1]);

                    }
                }, {
                    noAck: true
                });

                // await channel.consume(responses_queue, (msg) => {
                //     console.log(" [x] Received %s", msg.content.toString());
                //     let message = msg.content.toString();
                //     let splitted_message = message.split(':');
                //
                //     if (splitted_message[0] === 'responseEventInfo') {
                //         let odds_splitted = splitted_message[1].split(';');
                //
                //         odds[0] = parseFloat(odds_splitted[0]);
                //         odds[1] = parseFloat(odds_splitted[1]);
                //         odds[2] = parseFloat(odds_splitted[2]);
                //
                //         console.log('teste dentro async ' + odds);
                //
                //         return Promise.resolve(odds);
                //     }
                // }, {
                //     noAck: true
                // });

            } catch (e) {
                console.log(e);
            }

            while ( typeof event_status === 'undefined') {
                await sleep(500);
                console.log('sleeping');
            }

            if (event_status === 'open') {

                let model = new BetModel(req.body);
                model.save()
                    .then(doc => {
                        if (!doc || doc.length === 0) {
                            return res.status(500).send(doc);
                        }

                        return res.status(201).send(doc);
                    })
                    .catch(err => {
                        return res.status(500).json(err);
                    });

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