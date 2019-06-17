let express = require('express');
let router = express.Router();
let TeamModel = require('../models/team');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');

router.post('/teams', (req, res) => {

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

        if (req.body.command === 'postTeam') {

            console.log('ENTRA AQUI');

            let model = new TeamModel({
                name: req.body.name
            });
            model.save()
                .then(doc => {
                    if (!doc || doc.length === 0) {
                        return res.status(500).send(doc);
                    }

                    TeamModel.find({}, { _id: 0, __v:0})
                        .then(doc => {
                            return res.json(doc);
                        });

                })
                .catch(err => {
                    return res.status(500).json(err);
                });
        }

        if (req.body.command === 'removeTeam') {

            TeamModel.remove({ team_id: req.body.team_id }, function (err) {
                if (!err) {

                    TeamModel.find({}, { _id: 0, __v:0})
                        .then(doc => {
                            return res.json(doc);
                        });

                } else {
                    return res.status(400).send('Error removing team.');
                }
            });

        }
    }
});

router.delete('/teams', (req, res) => {

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

        if (!req.body.team_id) {

            return res.status(400).send("Missing team id.");

        } else {
        }
    }
});

router.get('/teams', (req, res) => {

    // list all teams
    if (Object.keys(req.body).length == 0) {
        TeamModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list teams by id
    if (req.body.hasOwnProperty('team_id')) {
        TeamModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;