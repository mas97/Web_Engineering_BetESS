let express = require('express');
let router = express.Router();
let EventModel = require('../models/event');
let amqp = require('amqplib');
var jwt = require('jsonwebtoken');
const fs   = require('fs');
var publicKEY  = fs.readFileSync( __dirname + '/public.key');

async function consume_requests(){
    try {
        let requests_queue = 'requests_to_e_t_s_l_service';
        let responses_queue = 'responses_to_e_t_s_l_service';
        // connect to Rabbit MQ and create a channel
        const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

        const channel = await connection.createChannel();

        await channel.assertQueue(requests_queue, {
            durable: false
        });

        channel.consume(requests_queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });

        channel.assertQueue(responses_queue, {
            durable: false
        });

        channel.sendToQueue(responses_queue, Buffer.from('resposta ao teste!!!'));
    } catch (e) {
        console.log(e);
    }
}

router.post('/events', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new EventModel(req.body);
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }

            return res.status(201).send(doc);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/events', (req, res) => {
    var query = JSON.stringify(req.body);

    // list all events
    if (Object.keys(req.body).length == 0) {
        EventModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list events by id
    if (req.body.hasOwnProperty('event_id')) {
        EventModel.find({ id: req.body.id }, { _id: 0, __v:0})
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