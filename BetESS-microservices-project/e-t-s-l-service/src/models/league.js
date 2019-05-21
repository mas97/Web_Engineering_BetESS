let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let leagueSchema = new mongoose.Schema({  
    name: {
        type: String,
        required: true
    }
});

leagueSchema.plugin(AutoIncrement, {inc_field: 'league_id'});

module.exports = mongoose.model('League', leagueSchema);