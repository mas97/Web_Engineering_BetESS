let express = require('express');
let router = express.Router();
let EventModel = require('../models/event');
let amqp = require('amqplib');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');

async function consume_requests(){
    try {
        let requests_queue = 'requests_e_t_s_l_service';
        let responses_queue = 'responses_e_t_s_l_service';
        // connect to Rabbit MQ and create a channel
        const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

        const channel = await connection.createChannel();

        await channel.assertQueue(requests_queue, {
            durable: false
        });

        let requested_event_id = -1;
        let event_result = '';
        let data;

        await channel.consume(requests_queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            let message = msg.content.toString();
            console.log(typeof message);
            let splitted_message = message.split(':');
            console.log(splitted_message);

            if (splitted_message[0] === 'requestEventInfo') {
                requested_event_id = parseFloat(splitted_message[1]);

                EventModel.findOne({event_id: requested_event_id}, { _id: 0, __v:0})
                    .then(async (doc) => {
                        if (doc) {
                            console.log("respondendo ao pedido do evento numero " + requested_event_id);
                            await channel.sendToQueue(responses_queue, Buffer.from('responseEventInfo:' + doc.oddHome + ';' + doc.oddDraw + ';' + doc.oddAway + ';' + doc.status));
                        }
                    });
            }

            if (splitted_message[0] === 'requestEventStatus'){
                requested_event_id = parseFloat(splitted_message[1]);

                EventModel.findOne({event_id: requested_event_id}, { _id: 0, __v:0})
                    .then(async (doc) => {
                        if (doc) {
                            console.log("respondendo ao pedido de status do evento numero " + requested_event_id);
                            await channel.sendToQueue(responses_queue, Buffer.from('responseEventStatus:' + doc.status));
                        }
                    });

            }

            if (splitted_message[0] === 'closeEvent') {
                data = splitted_message[1].split(';');
                requested_event_id = parseFloat(data[0]);
                event_result = data[1];

                EventModel.findOne({ event_id: requested_event_id }, function (err, doc) {
                    doc.status = 'closed';
                    doc.result = event_result;
                    doc.save();
                })
            }

        }, {
            noAck: true
        });

    } catch (e) {
        console.log(e);
    }
}

router.post('/events', (req, res) => {

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

        let model = new EventModel(req.body);
        model.save()
            .then(doc => {
                if (!doc || doc.length === 0) {
                    return res.status(500).send(doc);
                }

                EventModel.find({}, { _id: 0, __v:0})
                    .then(doc => {
                        return res.json(doc);
                    });

            })
            .catch(err => {
                return res.status(500).json(err);
            })
    }
});

router.get('/events', (req, res) => {

    // list all events
    if (Object.keys(req.body).length == 0) {
        EventModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list events by id
    if (req.body.hasOwnProperty('event_id')) {
        EventModel.find({ event_id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list events by premium attribute
    if (req.body.hasOwnProperty('premium')) {
        EventModel.find({ premium: req.body.premium }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

consume_requests();

module.exports = router;