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

INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('1', 'Fc Porto');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('2', 'SL Benfica');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('3', 'Tondela');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('4', 'Belenenses SAD');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('5', 'Boavista');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('6', 'Marítimo');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('7', 'Rio Ave FC');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('8', 'Portimonense');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('9', 'Sporting');
INSERT INTO `betess`.`team` (`oid`, `name`) VALUES ('10', 'Sp. Braga');

INSERT INTO `betess`.`event` (`oid`, `odddraw`, `oddaway`, `oddhome`, `result`, `status`, `premium`, `sport_oid`, `team_oid`, `league_oid`, `team_oid_2`) VALUES ('1', '1.27', '5.20', '9.50', 'NA', 'Open', TRUE, '1', '3', '1', '7');
INSERT INTO `betess`.`event` (`oid`, `odddraw`, `oddaway`, `oddhome`, `result`, `status`, `premium`, `sport_oid`, `team_oid`, `league_oid`, `team_oid_2`) VALUES ('2', '1.71', '3.85', '4.0', 'NA', 'Open', FALSE, '1', '5', '1', '2');
INSERT INTO `betess`.`event` (`oid`, `odddraw`, `oddaway`, `oddhome`, `result`, `status`, `premium`, `sport_oid`, `team_oid`, `league_oid`, `team_oid_2`) VALUES ('3', '2', '1.7', '3.6', 'NA', 'Open', FALSE, '1', '9', '1', '8');
INSERT INTO `betess`.`event` (`oid`, `odddraw`, `oddaway`, `oddhome`, `result`, `status`, `premium`, `sport_oid`, `team_oid`, `league_oid`, `team_oid_2`) VALUES ('4', '2.2', '3.7', '5.6', 'NA', 'OPEN', TRUE, '1', '4', '1', '6');
