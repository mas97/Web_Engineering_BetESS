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
    }
});

authSchema.plugin(AutoIncrement, {inc_field: 'userAuth_id'});

module.exports = mongoose.model('Auth', authSchema);