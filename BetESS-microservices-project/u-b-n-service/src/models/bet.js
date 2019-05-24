let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let betSchema = new mongoose.Schema({  
    amount: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    },
   paid: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }
});

betSchema.plugin(AutoIncrement, {inc_field: 'bet_id'});

module.exports = mongoose.model('Bet', betSchema);