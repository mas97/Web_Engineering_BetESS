DROP PROCEDURE IF EXISTS cashout;
DELIMITER $$
CREATE PROCEDURE cashout(IN id_bet INT, IN id_user INT)
BEGIN
	DECLARE erro BOOL DEFAULT 0;
    DECLARE aux DECIMAL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
	START TRANSACTION;

	SELECT (bet.amount DIV 2) INTO aux
    FROM bet
    WHERE bet.oid = id_bet; 

    
	UPDATE user SET user.balance = (user.balance + aux) WHERE user.oid = id_user;
    
    UPDATE bet SET bet.paid = 1 WHERE bet.oid = id_bet;

	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;


-- TEST
 CALL cashout(2, 2);
 SELECT * FROM user;
 SELECT * FROM bet;