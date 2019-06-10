let express = require('express');
let router = express.Router();
let NotificationModel = require('../models/notification');
var jwt = require('jsonwebtoken');
const fs   = require('fs');
var publicKEY  = fs.readFileSync( __dirname + '/public.key');

router.post('/notifications', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new NotificationModel(req.body);
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

router.get('/notifications', (req, res) => {
    var query = JSON.stringify(req.body);

    // list all notifications
    if (Object.keys(req.body).length == 0) {
        NotificationModel.find({}, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }

    // list notifications by id
    if (req.body.hasOwnProperty('notification_id')) {
        NotificationModel.find({ id: req.body.id }, { _id: 0, __v:0})
            .then(doc => {
                return res.json(doc);
            });
    }
});

module.exports = router;