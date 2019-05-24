let express = require('express');
let router = express.Router();
let UserModel = require('../models/user');
let NotificationModel = require('../models/notification');
let BetModel = require('../models/bet');

/* Returns doc w/ unpaid bets */
function getBetsCount() {
    return new Promise((resolve, reject) => {
        BetModel.find({paid: false}, { _id: 0, __v:0})
        .then( doc => {
            resolve(doc);
        });
    });
}

router.patch('/close_event', (req, res) => {
    if (Object.keys(req.body).length == 0) {
        return res.status(400).send('Request body is missing');
    }

   if(req.body.hasOwnProperty('id_event') && req.body.hasOwnProperty('result')) {
        // corpo da msg param id_event
        var ev_id = body['id_event'];
        var ev_result = body['result'];
        // vars para dados de cada bet
        var amount = 0;
        var user_id = 0;
        var result_user = "";
        var bets_unpaid;
        // CHAMADAS - MISSING (completar)
        var odd_home = 0;
        var odd_away = 0;
        var odd_draw = 0;
        var user_balance = 0;
    
        getBetsCount().then(doc => {
             bets_unpaid = doc;
             return res.json({'count': n}); 

             // mandar msg outro serviço para alterar estado evento (status e result)
             
             // pedir outro serviço as odds do evento em questão

             for (var bet in bets_unpaid) {
                if(bet['event_id'] = ev_id) {
                    amount = bet['amount'];
                    user_id = bet['user_id'];
                    result_bet = ['result'];

                    if(result_bet == ev_result) { 
                        if(ev_result == 'winHome') { // ----------------------------------------------------
                            let entry = {
                                status: 'unread',
                                balancebet: amount * odd_home // usar odds aqui - substituir odd_home
                            };
                            let notif = new NotificationModel(entry);
                            notif.save();
                           
                            UserModel.update(
                                {id: user_id},
                                // ir buscar o saldo do user : user_balance
                                {balance: user_balance + (amount * odd_home)}
                            );
                            
                            BetModel.update(
                                {id: bet['bet_id']},
                                {paid: true}
                            );  
                        }
                        if(ev_result == 'winAway') { // ----------------------------------------------------
                            let entry = {
                                status: 'unread',
                                balancebet: amount * odd_away // usar odds aqui - substituir odd_away
                            };
                            let notif = new NotificationModel(entry);
                            notif.save();
                            
                            UserModel.update(
                                {id: user_id},
                                // ir buscar o saldo do user : user_balance
                                {balance: user_balance + (amount * odd_home)}
                            );
                            
                            BetModel.update(
                                {id: bet['bet_id']},
                                {paid: true}
                            );  
                        }
                        if(ev_result == 'draw') { // ----------------------------------------------------
                            let entry = {
                                status: 'unread',
                                balancebet: amount * odd_draw // usar odds aqui - substituir odd_draw
                            };
                            let notif = new NotificationModel(entry);
                            notif.save();
                            
                            UserModel.update(
                                {id: user_id},
                                // ir buscar o saldo do user : user_balance
                                {balance: user_balance + (amount * odd_home)}
                            );
                            
                            BetModel.update(
                                {id: bet['bet_id']},
                                {paid: true}
                            );   
                        }
                    }             
                }
            }
        });
    }    
});

module.exports = router;