let mongoose = require('mongoose');

let leagueSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('League', leagueSchema);