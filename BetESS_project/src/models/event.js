let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let eventSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
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
    }
});

eventSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Event', eventSchema);