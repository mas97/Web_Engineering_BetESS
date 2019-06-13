let express = require('express');
let router = express.Router();
let LeagueModel = require('../models/league');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');

router.post('/leagues', (req, res) => {

    if (!req.headers.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.headers.authorization;

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
    }
});

router.delete('/leagues', (req, res) => {

    if (!req.headers.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.headers.authorization;

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

        if (!req.body.league_id) {

            return res.status(400).send("Missing bet id.");

        } else {

            LeagueModel.remove({ league_id: req.body.league_id }, function (err) {
                if (!err) {
                    return res.status(200);
                } else {
                    return res.status(400).send('Error removing league');
                }
            });
        }
    }
});

router.get('/leagues', (req, res) => {

    // list all leagues
    if (Object.keys(req.body).length == 0) {
        LeagueModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list leagues by id
    if (req.body.hasOwnProperty('league_id')) {
        LeagueModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;