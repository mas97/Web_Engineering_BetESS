let express = require('express');
let app = express();

let eventsRoute = require('./routes/events');
let leaguesRoute = require('./routes/leagues');
let sportsRoute = require('./routes/sports');
let teamsRoute = require('./routes/teams');
let bodyParser = require('body-parser');
let amqp = require('amqplib/callback_api');
require('./db');

amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel((err, ch) => {
        var queue = 'queue';
        var message = { type: '2', content: 'test' };

        ch.assertQueue(queue, { durable: false });
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    });
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});

app.use(bodyParser.json());

// middleware function declaration
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}`);

    next();
});

app.use(eventsRoute);
app.use(leaguesRoute);
app.use(sportsRoute);
app.use(teamsRoute);
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


