let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

teamSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Team', teamSchema);