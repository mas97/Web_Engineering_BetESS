SET SQL_SAFE_UPDATES = 0;

DROP PROCEDURE IF EXISTS subt_balance;
DELIMITER $$
CREATE PROCEDURE subt_balance(IN amount DECIMAL,
							  IN id_user INT)
BEGIN
	DECLARE erro BOOL DEFAULT 0;
    DECLARE aux DECIMAL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
    START TRANSACTION;

    SET aux = (SELECT (user.balance - amount) 
			   FROM user 
			   WHERE user.oid = id_user
               );
	
    
	IF (aux >= 0) THEN
		UPDATE user SET balance = (SELECT (balance - amount) WHERE oid = id_user);
    END IF;
    
    
	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;


-- TEST1: SUBTRACT 5c TO USER WITH OID=1 TO SIMULATE DRAW
-- TEST WITH VALUE GREATER THAN BALANCE TO CHECK THAT BALANCE DOES NOT CHANGE
CALL subt_balance(5, 2);

SELECT * FROM user;
