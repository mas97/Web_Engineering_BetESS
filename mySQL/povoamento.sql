INSERT INTO `betess`.`module` (`oid`, `moduleid`, `modulename`) VALUES ('1', 'sv2', 'Admin');
INSERT INTO `betess`.`module` (`oid`, `moduleid`, `modulename`) VALUES ('2', 'sv3', 'Users');
INSERT INTO `betess`.`module` (`oid`, `moduleid`, `modulename`) VALUES ('3', 'area16', 'Premium');

INSERT INTO `betess`.`group` (`oid`, `groupname`, `module_oid`) VALUES ('1', '1', '1');
INSERT INTO `betess`.`group` (`oid`, `groupname`, `module_oid`) VALUES ('2', '2', '2');
INSERT INTO `betess`.`group` (`oid`, `groupname`, `module_oid`) VALUES ('3', '3', '3');

INSERT INTO `betess`.`group_module` (`group_oid`, `module_oid`) VALUES ('1', '1');
INSERT INTO `betess`.`group_module` (`group_oid`, `module_oid`) VALUES ('2', '2');
INSERT INTO `betess`.`group_module` (`group_oid`, `module_oid`) VALUES ('3', '3');

INSERT INTO `betess`.`user` (`oid`, `username`, `password`, `email`, `balance`, `phoneno`, `name`, `group_oid`) VALUES ('1', 'admin', 'admin', 'admin@hotmail.com', '0', 'admin', 'admin', '1');
INSERT INTO `betess`.`user` (`oid`, `username`, `password`, `email`, `balance`, `phoneno`, `name`, `group_oid`) VALUES ('2', 'user', 'user', 'user@hotmail.com', '5', '252900867', 'user', '2');
UPDATE user SET premium = FALSE WHERE user.oid = 2;


INSERT INTO `betess`.`user_group` (`user_oid`, `group_oid`) VALUES ('1', '1');
INSERT INTO `betess`.`user_group` (`user_oid`, `group_oid`) VALUES ('2', '2');

ALTER TABLE `betess`.`bet` 
CHANGE COLUMN `oid` `oid` INT(11) NOT NULL AUTO_INCREMENT ;

ALTER TABLE `betess`.`notification` 
CHANGE COLUMN `oid` `oid` INT(11) NOT NULL AUTO_INCREMENT ;