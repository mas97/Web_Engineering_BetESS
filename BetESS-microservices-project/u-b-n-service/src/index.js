let express = require('express');
let app = express();

let usersRoute = require('./routes/users');
let betsRoute = require('./routes/bets');
let notificationsRoute = require('./routes/notifications');
let close_eventsRoute = require('./routes/close_event');
let bodyParser = require('body-parser');
require('./db');

/*amqp.connect('amqp://admin:StrongPassword@192.168.33.13:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel((err, ch) => {
        let queue = 'queue';

        ch.assertQueue(queue, { durable: false });
        ch.consume(queue, (message) => {
            console.log('Received message: ' + message.content);
        }, {noAck: true});
    });
});*/

app.use(bodyParser.json());

// middleware function declaration
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}`);

    next();
});

app.use(usersRoute);
app.use(betsRoute);
app.use(notificationsRoute);
app.use(close_eventsRoute);
app.use(express.static('public'));

// Handler for 404 Error - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('No matching route');
});

// Handler for 500 Error - Internal Error
app.use((err, req, res, next) => {
    console.error(err.stack);
});

const PORT = 3001;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));