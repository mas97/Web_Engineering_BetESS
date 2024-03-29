DROP PROCEDURE IF EXISTS premium;
DELIMITER $$
CREATE PROCEDURE premium(IN id_user INT)
BEGIN
	DECLARE erro BOOL DEFAULT 0;
    DECLARE aux DECIMAL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
    START TRANSACTION;

	SELECT (user.balance - 50) INTO aux
    FROM user
    WHERE user.oid = id_user;
	
    
	IF aux >= 0 THEN
		UPDATE user SET balance = aux WHERE user.oid = id_user;
		UPDATE user SET premium = 1 WHERE user.oid = id_user;
		INSERT INTO user_group (user_oid, group_oid)
			VALUES
			(id_user, 3);
    END IF;
    
    
	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;

-- UPDATE user SET premium = 0 WHERE user.oid = 2;