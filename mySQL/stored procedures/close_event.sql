DROP PROCEDURE IF EXISTS close_event;
DELIMITER $$
CREATE PROCEDURE close_event(IN id_event INT,
							  IN result VARCHAR(255))
BEGIN
	DECLARE erro BOOL DEFAULT 0;
	DECLARE n INT DEFAULT 0;
	DECLARE i INT DEFAULT 0;
	DECLARE odd_home INT DEFAULT 0;
  	DECLARE odd_away INT DEFAULT 0;
  	DECLARE odd_draw INT DEFAULT 0;
    DECLARE bet_amount INT DEFAULT 0;
	DECLARE user_id INT DEFAULT 0;
	DECLARE result_bet VARCHAR(255) DEFAULT '';
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
	START TRANSACTION;
    
    SELECT COUNT(*) FROM bet INTO n;
	SET i=1;

	UPDATE event set event.status = 'Closed' WHERE event.oid = id_event;
	UPDATE event set event.result = result WHERE event.oid = id_event;

	SELECT event.oddhome FROM event WHERE event.oid = id_event INTO odd_home;
  	SELECT event.oddaway FROM event WHERE event.oid = id_event INTO odd_away;
  	SELECT event.odddraw FROM event WHERE event.oid = id_event INTO odd_draw;
    

	WHILE i<=n DO 
  		IF ((SELECT event_oid FROM bet WHERE oid = i AND !paid) = id_event) THEN
        
  			SELECT bet.amount FROM bet WHERE bet.oid = i INTO bet_amount;
  			SELECT bet.user_oid FROM bet WHERE bet.oid = i INTO user_id;
  			SELECT bet.result FROM bet WHERE bet.oid = i INTO result_bet;
            
            -- select amount from bet where oid = i;

			IF (result_bet = result) THEN
				IF (result = 'winHome') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid) VALUES ( (bet_amount * odd_home), "New", user_id, id_event );
  					UPDATE user SET balance = (SELECT(balance + ((bet_amount * odd_home)))) WHERE user.oid = user_id;
                    UPDATE bet SET bet.paid = 1 WHERE bet.oid = i;
				END IF;
				IF (result = 'winAway') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid) VALUES ( (bet_amount * odd_away), "New", user_id, id_event );
  					UPDATE user SET balance = (SELECT(balance + ((bet_amount * odd_away)))) WHERE user.oid = user_id;
                    UPDATE bet SET bet.paid = 1 WHERE bet.oid = i;
				END IF;
				IF (result = 'draw') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid) VALUES ( (bet_amount * odd_draw), "New", user_id, id_event );
  					UPDATE user SET balance = (SELECT(balance + ((bet_amount * odd_draw)))) WHERE user.oid = user_id;
                    UPDATE bet SET bet.paid = 1 WHERE bet.oid = i;
				END IF;
			END IF;
  		END IF;
  		SET i = i + 1;
	END WHILE;

	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;

END
$$
DELIMITER ;