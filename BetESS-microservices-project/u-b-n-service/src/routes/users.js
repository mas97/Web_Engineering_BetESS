let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');
let amqp = require('amqplib');

async function consume_requests(){
    try {

        let requests_queue = 'requests_u_b_n_service_new_user';
        // connect to Rabbit MQ and create a channel
        const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

        const channel = await connection.createChannel();

        await channel.assertQueue(requests_queue, {
            durable: false
        });

        let data;

        await channel.consume(requests_queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            let message = msg.content.toString();
            console.log(typeof message);
            let splitted_message = message.split(':');
            console.log(splitted_message);

            if (splitted_message[0] === 'newUser') {
                data = splitted_message[1].split(';');

                let model = new UserModel({
                    email: data[0],
                    name: data[1],
                    phoneno: data[2],
                    balance: 5,
                    premium: false,
                    username: data[3]
                });
                model.save();
            }

        }, {
            noAck: true
        });

    } catch (e) {
        console.log(e);
    }
}

// VER SE ESTE VAI SER NECESSÁRIO JÁ QUE AGORA TEMOS O NOVO SERVIÇO DE AUTENTICAÇÃO
// router.post('/users', (req, res) => {
//     if (!req.body) {
//         return res.status(400).send('Request body is missing');
//     }
//
//     let model = new UserModel(req.body);
//     model.save()
//         .then(doc => {
//             if (!doc || doc.length === 0) {
//                 return res.status(500).send(doc);
//             }
//
//             return res.status(201).send(doc);
//         })
//         .catch(err => {
//             return res.status(500).json(err);
//         })
// });

router.post('/premium', async (req, res) => {

    console.log(req.body);

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
            return res.status(401).send('Invalid authentication token');
        }

            UserModel.findOne({user_id: user_id})
                .then(async doc => {
                    console.log(doc);

                    let premium = doc.premium;
                    console.log('premium: ' + premium);

                    if (!premium) {

                        let user_balance = doc.balance;

                        if (user_balance >= 50) {

                            doc.premium = true;
                            doc.balance = user_balance - 50;
                            doc.save();


                            try {
                                let requests_queue = 'requests_u_b_n_service_premium';

                                // connect to Rabbit MQ and create a channel
                                const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

                                const channel = await connection.createChannel();

                                await channel.assertQueue(requests_queue, {
                                    durable: false
                                });

                                await channel.sendToQueue(requests_queue, Buffer.from('upgradePremium:' + user_id));
                                console.log('message sent!');

                            } catch (e) {
                                console.log(e);
                            }

                            return res.json(doc);

                        } else {
                            return res.status(400).send('Insufficient balance');
                        }
                    } else {
                        return res.status(400).send('Already a premium user');
                    }
                })
    }
});

// router.post('/users', (req, res) => {
//
//     console.log(req.body);
//
//     let user_id = -1;
//
//     if (!req.body.authorization) {
//
//         return res.status(401).send('Missing auth token');
//
//     } else {
//
//         let header_token = req.body.authorization;
//
//         try {
//             let decoded = jwt.verify(header_token, publicKEY, ['RS256']);
//
//             console.log(decoded);
//             user_id = decoded.user_id;
//         } catch (e) {
//             console.log(e);
//             return res.status(401).send('Invalid authentication token');
//         }
//
//         if (req.body.balance) {
//
//             let credits_code = req.body.balance.split(':');
//
//             UserModel.findOne({ user_id: user_id }, function (err, doc) {
//                 if (credits_code[0] === '+') {
//                     doc.balance = doc.balance + parseFloat(credits_code[1]);
//                 } else {
//
//                     if (credits_code[0] === '+') {
//
//                         let withdraw_amount = parseFloat(credits_code[1]);
//
//                         if (withdraw_amount > doc.balance) {
//                             return res.status(400).send('Not enough credits')
//                         } else {
//                             doc.balance = doc.balance + parseFloat(credits_code[1]);
//                         }
//
//                     }
//
//                 }
//
//                 doc.save();
//                 return res.json(doc);
//             })
//
//         }
//
//     }
// });

router.post('/users', (req, res) => {

    console.log(req.body);

    let user_id = -1;

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
            user_id = decoded.user_id;

            console.log(user_id)
        } catch (e) {
            console.log(e);
            return res.status(401).send('Invalid authentication token');
        }

        // // list all users
        // if (Object.keys(req.body).length == 1) {
        //     UserModel.find({}, {_id: 0, __v: 0})
        //         .then(doc => {
        //             return res.json(doc);
        //         });
        // }

        // list users by id
        if (req.body.command === 'getUser') {

            console.log(user_id);

            UserModel.findOne({user_id: user_id}, {_id: 0, __v: 0})
                .then(doc => {
                    console.log(doc);
                    return res.json(doc);
                });

        }

        if (req.body.command === 'draw') {

            console.log(req.body);

            if (req.body.hasOwnProperty('balance')) {

                UserModel.findOne({user_id: user_id}, function (err, doc) {

                    let withdraw_amount = req.body.balance;
                    console.log(withdraw_amount);

                    if (withdraw_amount > doc.balance) {
                        return res.status(400).send('Not enough credits')
                    } else {
                        doc.balance = Number(doc.balance) - Number(withdraw_amount);
                        console.log(doc.balance);
                    }

                    doc.save();
                    console.log(doc);
                    return res.json(doc);
                })
            } else {
                return res.status(400).send('Missing balance in body.')
            }
        }

        if (req.body.command === 'deposit') {

            if (req.body.hasOwnProperty('balance')) {

                UserModel.findOne({user_id: user_id}, function (err, doc) {

                    doc.balance = Number(doc.balance) + Number(req.body.balance);

                    doc.save();
                    return res.json(doc);
                })
            } else {
                return res.status(400).send('Missing balance in body.')
            }
        }

        if (req.body.command === 'upd_phone') {

            if (req.body.hasOwnProperty('phoneno')) {

                UserModel.findOne({user_id: user_id}, function (err, doc) {

                    doc.phoneno = req.body.phoneno;
                    
                    doc.save();
                    return res.json(doc);
                })
            } else {
                return res.status(400).send('Missing phone in body.')
            }
        }
    }
});

consume_requests();

module.exports = router;