let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');

router.post('/users', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new UserModel(req.body);
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

router.get('/users', (req, res) => {
    var query = JSON.stringify(req.body);

    // list all users
    if (Object.keys(req.body).length == 0) {
        UserModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list users by id
    if (req.body.hasOwnProperty('user_id')) {
        UserModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;