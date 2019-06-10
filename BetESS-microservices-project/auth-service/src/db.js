let mongoose = require('mongoose');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'betess';        // REPLACE WITH YOUR DB NAME

mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error');
    });