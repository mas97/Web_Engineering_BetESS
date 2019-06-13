let express = require('express');
let router = express.Router();
let BetModel = require('../models/bet');
let UserModel = require('../models/user');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');

router.post('/bets', (req, res) => {

    let user_id = -1;

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

        let user_balance = -1;

        UserModel.findOne({user_id: user_id})
            .then(doc => {
                user_balance = parseFloat(doc.balance);
            });

        let bet_amount = -1;

        if (req.body.amount) {
            bet_amount = parseFloat(req.body.amount);
        } else {
            return res.status(400).send('Missing ber amount.');
        }

        if (user_balance > bet_amount) {
            let model = new BetModel(req.body);
            model.save()
                .then(doc => {
                    if (!doc || doc.length === 0) {
                        return res.status(500).send(doc);
                    }

                    return res.status(201).send(doc);
                })
                .catch(err => {
                    return res.status(500).json(err);
                });
        }
    }
});

router.get('/bets', (req, res) => {

    if (!req.headers.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.headers.authorization;

        try{
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
        } catch (e) {
            console.log(e);
            return res.status(401).send('Missing auth token');
        }


        // list all bets
        if (Object.keys(req.body).length == 0) {
            BetModel.find({}, { _id: 0, __v:0})
                .then(doc => {
                    return res.json(doc);
                });
        }

        // list bets by id
        if (req.body.hasOwnProperty('bet_id')) {
            BetModel.find({ id: req.body.id }, { _id: 0, __v:0})
                .then(doc => {
                    return res.json(doc);
                });
        }
    }
});

module.exports = router;