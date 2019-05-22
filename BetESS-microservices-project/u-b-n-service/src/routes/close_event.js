let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let NotificationModel = require('../models/notification');
let BetModel = require('../models/bet');

/* Aux functions to reduce patch size */
function getBetsCount() {
}

router.patch('/close_event', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(400).send('Request body is missing');
    }

   if(req.body.hasOwnProperty('id_event') && req.body.hasOwnProperty('result')){
        var n = 0;
        var i = 0;
        var odd_home = 0;
        var odd_away = 0;
        var odd_draw = 0;
        var bet_amount = 0;
        var user_id = 0;
        var result_bet = "";

    
        BetModel.find({}, { _id: 0, __v:0})
            .then( doc => {
                return res.json({'count': doc.length});
        }); // tested till here, missing assign count to var n
    }    
});

module.exports = router;