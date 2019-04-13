INSERT INTO `betess`.`module` (`oid`, `moduleid`, `modulename`) VALUES ('1', 'sv2', 'Admin');
INSERT INTO `betess`.`module` (`oid`, `moduleid`, `modulename`) VALUES ('2', 'sv3', 'Users');

INSERT INTO `betess`.`group` (`oid`, `groupname`, `module_oid`) VALUES ('1', '1', '1');
INSERT INTO `betess`.`group` (`oid`, `groupname`, `module_oid`) VALUES ('2', '2', '2');

INSERT INTO `betess`.`group_module` (`group_oid`, `module_oid`) VALUES ('1', '1');
INSERT INTO `betess`.`group_module` (`group_oid`, `module_oid`) VALUES ('2', '2');

INSERT INTO `betess`.`user` (`oid`, `username`, `password`, `email`, `balance`, `phoneno`, `name`, `group_oid`) VALUES ('1', 'admin', 'admin', 'admin@hotmail.com', '0', 'admin', 'admin', '1');
INSERT INTO `betess`.`user` (`oid`, `username`, `password`, `email`, `balance`, `phoneno`, `name`, `group_oid`) VALUES ('2', 'user', 'user', 'user@hotmail.com', '5', '252900867', 'user', '2');

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
	
	IF (aux >= 0) 
		THEN UPDATE user SET user.balance = (SELECT (balance - amount) WHERE oid = id_user);
    END IF;
    
    
	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END
$$
DELIMITER ;