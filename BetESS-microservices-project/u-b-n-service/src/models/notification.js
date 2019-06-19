let mongoose = require('mongoose');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let notificationSchema = new mongoose.Schema({  
    status: {
        type: String,
        required: true
    },
    balancebet: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    user_id: {
        type: Number,
        required: true
    },
    event_id: {
        type: Number,
        required: true
    }
});

notificationSchema.plugin(AutoIncrement, {inc_field: 'notification_id'});

module.exports = mongoose.model('Notification', notificationSchema);