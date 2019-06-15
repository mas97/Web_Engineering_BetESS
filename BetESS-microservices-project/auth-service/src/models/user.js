let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let authSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },premium: {
        type: Boolean,
        required: true,
        default: false
    }
});

authSchema.plugin(AutoIncrement, {inc_field: 'userAuth_id'});

module.exports = mongoose.model('Auth', authSchema);