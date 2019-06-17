let express = require('express');
let router = express.Router();
let SportModel = require('../models/sport');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');

router.post('/sports', (req, res) => {

    console.log(req.body);

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;
        console.log(req.body.authorization);

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
        } catch (e) {
            console.log('ERRO VERIFY');
            console.log(e);
            return res.status(401).send('Missing auth token');
        }

        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        if (req.body.command === 'postSport') {

            console.log('ENTRA AQUI');

            let model = new SportModel({
                name: req.body.name
            });
            model.save()
                .then(doc => {
                    if (!doc || doc.length === 0) {
                        return res.status(500).send(doc);
                    }

                    SportModel.find({}, { _id: 0, __v:0})
                        .then(doc => {
                            return res.json(doc);
                        });

                })
                .catch(err => {
                    return res.status(500).json(err);
                })
        }

        if (req.body.command === 'removeSport') {

            SportModel.remove({ sport_id: req.body.sport_id }, function (err) {
                if (!err) {

                    SportModel.find({}, { _id: 0, __v:0})
                        .then(doc => {
                            return res.json(doc);
                        });

                } else {
                    return res.status(400).send('Error removing sport');
                }
            });

        }
    }
});

router.delete('/sports', (req, res) => {

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

        if (!req.body.sport_id) {

            return res.status(400).send("Missing sport id.");

        } else {

        }
    }
});

router.get('/sports', (req, res) => {

    // list all sports
    if (Object.keys(req.body).length == 0) {
        SportModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list sports by id
    if (req.body.hasOwnProperty('sport_id')) {
        SportModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;