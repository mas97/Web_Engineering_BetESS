let express = require('express');
let app = express();

let eventsRoute = require('./routes/events');
let bodyParser = require('body-parser');
require('./db');

app.use(bodyParser.json());

// middleware function declaration
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}, ${req.body}`);

    next();
});

app.use(eventsRoute);
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

