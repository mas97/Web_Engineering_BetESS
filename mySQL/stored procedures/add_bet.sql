SET SQL_SAFE_UPDATES = 0;

DROP PROCEDURE IF EXISTS add_bet;
DELIMITER $$
CREATE PROCEDURE add_bet(IN id_user INT, 
						      IN amountIN DECIMAL(19,2),
							  IN resultIN VARCHAR(255), 
                              IN event_id INT)
BEGIN
	DECLARE erro BOOL DEFAULT 0;
    DECLARE aux DECIMAL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
    START TRANSACTION;

    SET aux = (SELECT (user.balance - amountIN) 
			   FROM user 
			   WHERE user.oid = id_user
               );
	
	IF (aux >= 0) THEN 
		INSERT INTO bet (result, amount, user_oid, event_oid)
					VALUES (resultIN, amountIN, id_user, event_id);
		UPDATE user SET user.balance = (SELECT (balance - amountIN) WHERE user.oid = id_user);
    END IF;
    
    
	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;

CALL add_bet(9, 2, 500, 'winHome', 2);

SELECT * FROM User;
SELECT * FROM Bet;