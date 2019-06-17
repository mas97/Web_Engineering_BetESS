let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let eventSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'open'
    },
    result: {
        type: String,
        required: true,
        default: 'NA'
    },
    oddHome: {
        type: Number,
        required: true
    },
    oddAway: {
        type: Number,
        required: true
    },
    oddDraw: {
        type: Number,
        required: true
    },
    premium: {
        type: Boolean,
        required: true
    },
    sport_id: {
        type: Number,
        required: true
    },
    league_id: {
        type: Number,
        required: true
    },
    team_home_id: {
        type: Number,
        required: true
    },
    team_away_id: {
        type: Number,
        required: true
    }
});

eventSchema.plugin(AutoIncrement, {inc_field: 'event_id'});

module.exports = mongoose.model('Event', eventSchema);