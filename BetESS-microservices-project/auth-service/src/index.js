let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let auth = require('./auth');
var jwt = require('jsonwebtoken');
const fs   = require('fs');
let userModel = require('./models/user');
var privateKEY  = fs.readFileSync( __dirname + '/private.key');
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

    userModel.findOne({email: reqData.email}, {_id: 0, __v: 0})
        .then(doc => {
            if (doc.length === 0) {
                return res.status(500).send(doc);
            } else {
                let password = reqData.password;

                if (!validPassword(doc, password)) {
                    res.status(401).send('Password not valid.');
                } else {
                    let token = jwt.sign({ foo: 'bar' }, privateKEY, { algorithm: 'RS256'});
                    res.status(200).send({token: token});
                }
            }
        })
});

app.post('/users', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }

    let model = new userModel(req.body);
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




