let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new mongoose.Schema({
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
        required: false
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