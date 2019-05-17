let mongoose = require('mongoose');

let teamSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);