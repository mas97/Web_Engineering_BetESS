let express = require('express');
let router = express.Router();
let TeamModel = require('../models/team');

router.post('/teams', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new TeamModel(req.body);
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

router.get('/teams', (req, res) => {
    var query = JSON.stringify(req.body);

    // list all teams
    if (!req.body) {
        TeamModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list teams by id
    if (req.body.hasOwnProperty('id')) {
        TeamModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;