let mongoose = require('mongoose');

let sportSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sport', sportSchema);