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
            res.status(500).json(err);
        })
});

router.get('/events', (req, res) => {
    res.send('You have requested the events list');
});

router.get('/events/:id', (req, res) => {
    res.send(`You have requested the event ${req.params.id}`);
});

module.exports = router;