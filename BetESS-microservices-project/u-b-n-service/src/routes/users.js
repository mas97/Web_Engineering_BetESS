let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
var jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');
let amqp = require('amqplib');

async function consume_requests(){
    try {
        let requests_queue = 'requests_u_b_n_service';
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
                        premium: false
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

router.post('/premium', (req, res) => {

    let user_id = -1;

    if (!req.headers.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.headers.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
            user_id = decoded.user_id;
        } catch (e) {
            console.log(e);
            return res.status(401).send('Invalid authentication token');
        }

        if (req.body.hasOwnProperty('premium')) {

            UserModel.findOne({user_id: user_id}, {balance: 1})
                .then(doc => {
                    console.log(doc);
                    let user_balance = parseFloat(doc.balance);

                    if (user_balance >= 50) {

                        UserModel.findOne({user_id: user_id}, function (err, doc) {
                            doc.premium = true;
                            doc.balance = user_balance - 50;
                            doc.save();
                        });

                        return res.status(200);

                    } else {
                        return res.status(400).send('Insufficient balance');
                    }
                })

        } else {
            return res.status(400).send('Missing premium attribute');
        }
    }
});

router.get('/users', (req, res) => {

    if (!req.headers.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.headers.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
            user_id = decoded.user_id;
        } catch (e) {
            console.log(e);
            return res.status(401).send('Invalid authentication token');
        }

        if (req.body.hasOwnProperty('premium')) {

            // list all users
            if (Object.keys(req.body).length == 0) {
                UserModel.find({}, {_id: 0, __v: 0})
                    .then(doc => {
                        return res.json(doc);
                    });
            }

            // list users by id
            if (req.body.hasOwnProperty('user_id')) {
                UserModel.find({id: req.body.id}, {_id: 0, __v: 0})
                    .then(doc => {
                        return res.json(doc);
                    });
            }
        } else {
            return res.status(400).send('');
        }
    }
});

consume_requests();

module.exports = router;