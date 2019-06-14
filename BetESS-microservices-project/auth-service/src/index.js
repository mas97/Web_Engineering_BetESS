let express = require('express');
let app = express();
let bodyParser = require('body-parser');
// let auth = require('./auth');
let jwt = require('jsonwebtoken');
const fs   = require('fs');
let amqp = require('amqplib');
let authModel = require('./models/user');
let privateKEY  = fs.readFileSync( __dirname + '/private.key');
let publicKEY  = fs.readFileSync( __dirname + '/public.key');
let bcrypt = require('bcrypt');
require('./db');

app.use(bodyParser.json());

// middleware function declaration
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}`);

    next();
});

function validPassword(user, password) {
    return user.password === password;
}

app.post('/token', (req, res) => {

    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let reqData = req.body;

    authModel.findOne({email: reqData.email}, {_id: 0, __v: 0})
        .then(doc => {
            if (doc.length === 0) {
                return res.status(500).send(doc);
            } else {
                let password = reqData.password;

                // bcrypt.compare(password, doc.password, function(err, res) {
                //     if (!res) {
                //         return res.status(401).send('Password not valid.');
                //     } else {
                //         let token = jwt.sign({ user_id: doc.user_id }, privateKEY, { algorithm: 'RS256'});
                //         return res.status(200).send({token: token});
                //     }
                // });

                if (!validPassword(doc, password)) {
                    return res.status(401).send('Password not valid.');
                } else {
                    let token = jwt.sign({ user_id: doc.user_id }, privateKEY, { algorithm: 'RS256'});
                    return res.status(200).send({token: token});
                }
            }
        })
});

app.post('/userAuth', async (req, res) => {

    let user_id = -1;

    if (!req.headers.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.headers.authorization;

        try {
            let decoded = jwt.verify(header_token, publicKEY, ['RS256']);

            console.log(decoded);
            user_id = decoded.user_id;
        } catch (e) {
            console.log(e);
            return res.status(401).send('Missing auth token');
        }

        if (!req.body) {
            return res.status(400).send('Request body is missing');
        }

        if (req.body.hasOwnProperty('password')) {

            // req.body.password = await bcrypt.hash(req.body.password, 10);

            authModel.findOne({user_id: user_id}, function (err, doc) {
                doc.password = req.body.password;
                doc.save();
            });

        }
    }

});

app.post('/register', async (req, res) => {

    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    // req.body.password = await bcrypt.hash(req.body.password, 10);
    let model = new authModel(req.body);
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

    try {
        let requests_queue = 'requests_u_b_n_service';

        // connect to Rabbit MQ and create a channel
        const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

        const channel = await connection.createChannel();

        await channel.assertQueue(requests_queue, {
            durable: false
        });

        await channel.sendToQueue(requests_queue, Buffer.from('newUser:' + req.body.email + ';' + req.body.name + ';' + req.body.phoneno));
        console.log('message sent!');

    } catch (e) {
        console.log(e);
    }

});

app.use(express.static('public'));

// Handler for 404 Error - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('No matching route');
});

// Handler for 500 Error - Internal Error
app.use((err, req, res, next) => {
    console.error(err.stack);
});

const PORT = 3000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));




