let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    premium: {
        type: Boolean,
        required: true
    }
});

userSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = mongoose.model('User', userSchema);