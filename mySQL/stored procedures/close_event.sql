DROP PROCEDURE IF EXISTS close_events;
DELIMITER $$
CREATE PROCEDURE close_events(IN id_event INT,
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
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
	START TRANSACTION;
    
    SELECT COUNT(*) FROM bet INTO n;
	SET i=0;

	UPDATE event set event.status = result WHERE event.oid = id_event;

	SELECT event.oddhome FROM event WHERE event.oid = id_event INTO odd_home;
  	SELECT event.oddaway FROM event WHERE event.oid = id_event INTO odd_away;
  	SELECT event.odddraw FROM event WHERE event.oid = id_event INTO odd_draw;

	WHILE i<n DO 
  		IF ((SELECT bet.result FROM bet WHERE bet.oid = i) = result) THEN
  			SELECT bet.amount FROM bet WHERE event.oid = id_event INTO bet_amount;
  			SELECT bet.user_oid FROM bet WHERE event.oid = id_event INTO user_id; 

			IF (bet.result = result) THEN
				IF (result = 'winHome') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid)
  						VALUES 
  						( (bet.amount * odd_home), "New", user_id, id_event );
  					UPDATE user SET user.balance = (SELECT(balance + ((bet.amount * odd_home)))) WHERE user.oid = user_id;
				END IF;
				IF (result = 'winAway') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid)
  						VALUES 
  						( (bet.amount * odd_away), "New", user_id, id_event );
  					UPDATE user SET user.balance = (SELECT(balance + ((bet.amount * odd_away)))) WHERE user.oid = user_id;
				END IF;
				IF (result = 'draw') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid)
  						VALUES 
  						( (bet.amount * odd_draw), "New", user_id, id_event );
  					UPDATE user SET user.balance = (SELECT(balance + ((bet.amount * odd_draw)))) WHERE user.oid = user_id;
				END IF;
			END IF;
			IF (bet.result != result) THEN
				IF (result = 'winHome') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid)
  						VALUES 
  						( -(bet.amount * odd_home), "New", user_id, id_event );
  					UPDATE user SET user.balance = (SELECT(balance - ((bet.amount * odd_home)))) WHERE user.oid = user_id;
				END IF;
				IF (result = 'winAway') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid)
  						VALUES 
  						( -(bet.amount * odd_away), "New", user_id, id_event );
  					UPDATE user SET user.balance = (SELECT(balance - ((bet.amount * odd_away)))) WHERE user.oid = user_id;
				END IF;
				IF (result = 'draw') THEN
					INSERT INTO notification (balancebet, status, user_oid, event_oid)
  						VALUES 
  						( -(bet.amount * odd_draw), "New", user_id, id_event );
  					UPDATE user SET user.balance = (SELECT(balance - ((bet.amount * odd_draw)))) WHERE user.oid = user_id;
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