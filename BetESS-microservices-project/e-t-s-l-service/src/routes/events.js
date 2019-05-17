let express = require('express');
let router = express.Router();
let EventModel = require('../models/event');

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
    if (!req.body) {
        EventModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list events by id
    if (req.body.hasOwnProperty('id')) {
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

module.exports = router;