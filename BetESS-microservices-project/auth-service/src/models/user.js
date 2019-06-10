let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = mongoose.model('User', userSchema);