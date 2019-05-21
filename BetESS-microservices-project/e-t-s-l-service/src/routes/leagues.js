let express = require('express');
let router = express.Router();
let LeagueModel = require('../models/league');

router.post('/leagues', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new LeagueModel(req.body);
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

router.get('/leagues', (req, res) => {
    var query = JSON.stringify(req.body);

    // list all leagues
    if (!req.body) {
        LeagueModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list leagues by id
    if (req.body.hasOwnProperty('id')) {
        LeagueModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;