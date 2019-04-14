DROP PROCEDURE IF EXISTS sum_balance;
DELIMITER $$
CREATE PROCEDURE sum_balance(IN amount DECIMAL,
							 IN id_user INT)
BEGIN
	DECLARE erro BOOL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
	START TRANSACTION;

	UPDATE user SET user.balance = (SELECT(balance + amount)) WHERE user.oid = id_user;

	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;

-- TEST: ADD MORE 5c TO USER WITH OID=1
 CALL sum_balance(5, 2);
 SELECT * FROM user;

SET SQL_SAFE_UPDATES = 0;
UPDATE user SET user.balance = 5;