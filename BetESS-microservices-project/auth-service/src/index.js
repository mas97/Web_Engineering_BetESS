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
let cors = require('cors');
// let bcrypt = require('bcrypt');
require('./db');

app.use(bodyParser.json());
app.use(cors());

// middleware function declaration
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}`);

    next();
});

function validPassword(user, password) {
    return user.password === password;
}

async function consume_requests(){
    try {
        let requests_queue = 'requests_u_b_n_service_premium';
        // connect to Rabbit MQ and create a channel
        const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

        const channel = await connection.createChannel();

        await channel.assertQueue(requests_queue, {
            durable: false
        });

        await channel.consume(requests_queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
            let message = msg.content.toString();
            console.log(typeof message);
            let splitted_message = message.split(':');
            console.log(splitted_message);

            if (splitted_message[0] === 'upgradePremium') {

                let user_id = parseFloat(splitted_message[1]);

                authModel.findOne({user_id: user_id}, function (err, doc) {
                    doc.premium = true;
                    doc.save();
                });
            }

        }, {
            noAck: true
        });

    } catch (e) {
        console.log(e);
    }
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
                    let token = jwt.sign({ user_id: doc.userAuth_id, premium: doc.premium }, privateKEY, { algorithm: 'RS256'});
                    return res.json({'token': token});
                }
            }
        })
});

app.post('/userAuth', async (req, res) => {

    let user_id = -1;

    if (!req.body.authorization) {

        return res.status(401).send('Missing auth token');

    } else {

        let header_token = req.body.authorization;

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

        if (req.body.command === 'upd_pwd') {

            if (req.body.hasOwnProperty('password')) {

                // req.body.password = await bcrypt.hash(req.body.password, 10);

                authModel.findOne({user_id: user_id}, function (err, doc) {
                    doc.password = req.body.password;
                    doc.save();
                });

            }

        }
    }

});

app.post('/register', async (req, res) => {

    console.log(req.body);

    console.log( 'PEDIDO\n' + req);

    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    // req.body.password = await bcrypt.hash(req.body.password, 10);
    let model = new authModel({
        password: req.body.password,
        email: req.body.email
    });

    try {
        let requests_queue = 'requests_u_b_n_service_new_user';

        // connect to Rabbit MQ and create a channel
        const connection = await amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672');

        const channel = await connection.createChannel();

        await channel.assertQueue(requests_queue, {
            durable: false
        });

        if (typeof req.body.phoneno === 'undefined') {
            req.body.phoneno = '';
        }

        await channel.sendToQueue(requests_queue, Buffer.from('newUser:' + req.body.email + ';' + req.body.name + ';' + req.body.phoneno + ';' + req.body.username));
        console.log('message sent!');

    } catch (e) {
        console.log(e);
    }

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

consume_requests();




