let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let sportSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: true
    }
});

sportSchema.plugin(AutoIncrement, {inc_field: 'sport_id'});

module.exports = mongoose.model('Sport', sportSchema);