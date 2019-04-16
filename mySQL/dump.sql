-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: betess
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bet`
--

DROP TABLE IF EXISTS `bet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bet` (
  `oid` int(11) NOT NULL,
  `result` varchar(255) DEFAULT NULL,
  `amount` decimal(19,2) DEFAULT NULL,
  `user_oid` int(11) DEFAULT NULL,
  `event_oid` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `fk_bet_user` (`user_oid`),
  KEY `fk_bet_event` (`event_oid`),
  CONSTRAINT `fk_bet_event` FOREIGN KEY (`event_oid`) REFERENCES `event` (`oid`),
  CONSTRAINT `fk_bet_user` FOREIGN KEY (`user_oid`) REFERENCES `user` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bet`
--

LOCK TABLES `bet` WRITE;
/*!40000 ALTER TABLE `bet` DISABLE KEYS */;
/*!40000 ALTER TABLE `bet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event` (
  `oid` int(11) NOT NULL,
  `odddraw` decimal(19,2) DEFAULT NULL,
  `oddaway` decimal(19,2) DEFAULT NULL,
  `oddhome` decimal(19,2) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `premium` bit(1) DEFAULT NULL,
  `sport_oid` int(11) DEFAULT NULL,
  `team_oid` int(11) DEFAULT NULL,
  `league_oid` int(11) DEFAULT NULL,
  `team_oid_2` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `fk_event_sport` (`sport_oid`),
  KEY `fk_event_team_2` (`team_oid`),
  KEY `fk_event_league` (`league_oid`),
  KEY `fk_event_team` (`team_oid_2`),
  CONSTRAINT `fk_event_league` FOREIGN KEY (`league_oid`) REFERENCES `league` (`oid`),
  CONSTRAINT `fk_event_sport` FOREIGN KEY (`sport_oid`) REFERENCES `sport` (`oid`),
  CONSTRAINT `fk_event_team` FOREIGN KEY (`team_oid_2`) REFERENCES `team` (`oid`),
  CONSTRAINT `fk_event_team_2` FOREIGN KEY (`team_oid`) REFERENCES `team` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1.00,1.40,1.20,'NA','Open','\0',1,2,1,1),(2,2.00,2.00,2.00,'NA','Open','\0',1,1,1,2);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `oid` int(11) NOT NULL,
  `groupname` varchar(255) DEFAULT NULL,
  `module_oid` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `fk_group_module` (`module_oid`),
  CONSTRAINT `fk_group_module` FOREIGN KEY (`module_oid`) REFERENCES `module` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'1',1),(2,'2',2),(3,'3',3);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_module`
--

DROP TABLE IF EXISTS `group_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_module` (
  `group_oid` int(11) NOT NULL,
  `module_oid` int(11) NOT NULL,
  PRIMARY KEY (`group_oid`,`module_oid`),
  KEY `fk_group_module_group` (`group_oid`),
  KEY `fk_group_module_module` (`module_oid`),
  CONSTRAINT `fk_group_module_group` FOREIGN KEY (`group_oid`) REFERENCES `group` (`oid`),
  CONSTRAINT `fk_group_module_module` FOREIGN KEY (`module_oid`) REFERENCES `module` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_module`
--

LOCK TABLES `group_module` WRITE;
/*!40000 ALTER TABLE `group_module` DISABLE KEYS */;
INSERT INTO `group_module` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `group_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `league`
--

DROP TABLE IF EXISTS `league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `league` (
  `oid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league`
--

LOCK TABLES `league` WRITE;
/*!40000 ALTER TABLE `league` DISABLE KEYS */;
INSERT INTO `league` VALUES (1,'Liga Portuguesa');
/*!40000 ALTER TABLE `league` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `oid` int(11) NOT NULL,
  `moduleid` varchar(255) DEFAULT NULL,
  `modulename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'sv2','Admin'),(2,'sv3','Users'),(3,'area16','Premium');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `oid` int(11) NOT NULL,
  `balancebet` decimal(19,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_oid` int(11) DEFAULT NULL,
  `event_oid` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `fk_notification_user` (`user_oid`),
  KEY `fk_notification_event` (`event_oid`),
  CONSTRAINT `fk_notification_event` FOREIGN KEY (`event_oid`) REFERENCES `event` (`oid`),
  CONSTRAINT `fk_notification_user` FOREIGN KEY (`user_oid`) REFERENCES `user` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sport`
--

DROP TABLE IF EXISTS `sport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sport` (
  `oid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sport`
--

LOCK TABLES `sport` WRITE;
/*!40000 ALTER TABLE `sport` DISABLE KEYS */;
INSERT INTO `sport` VALUES (1,'Futebol');
/*!40000 ALTER TABLE `sport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `oid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'Fc Porto'),(2,'SL Benfica');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `oid` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `balance` decimal(19,2) DEFAULT NULL,
  `phoneno` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `premium` bit(1) DEFAULT NULL,
  `group_oid` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `fk_user_group` (`group_oid`),
  CONSTRAINT `fk_user_group` FOREIGN KEY (`group_oid`) REFERENCES `group` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','admin@hotmail.com',0.00,'admin','admin',NULL,1),(2,'user','user','user@hotmail.com',55.00,'252900867','user','',2),(3,'marco','marco35','marant_silva@hotmail.com',5.00,'123','marco','\0',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group` (
  `user_oid` int(11) NOT NULL,
  `group_oid` int(11) NOT NULL,
  PRIMARY KEY (`user_oid`,`group_oid`),
  KEY `fk_user_group_user` (`user_oid`),
  KEY `fk_user_group_group` (`group_oid`),
  CONSTRAINT `fk_user_group_group` FOREIGN KEY (`group_oid`) REFERENCES `group` (`oid`),
  CONSTRAINT `fk_user_group_user` FOREIGN KEY (`user_oid`) REFERENCES `user` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (1,1),(2,2),(2,3);
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'betess'
--
/*!50003 DROP PROCEDURE IF EXISTS `close_events` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `close_events`(IN id_event INT,
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

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `premium` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `premium`(IN id_user INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subt_balance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `subt_balance`(IN amount DECIMAL,
							  IN id_user INT)
BEGIN
	DECLARE erro BOOL DEFAULT 0;
    DECLARE aux DECIMAL DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET erro = 1;
    START TRANSACTION;

	SELECT (user.balance - amount) INTO aux
    FROM user
    WHERE user.oid = id_user;
	
    
	IF aux >= 0 THEN
		UPDATE user SET balance = aux WHERE user.oid = id_user;
    END IF;
    
    
	IF erro 
		THEN ROLLBACK;
		ELSE COMMIT;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sum_balance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sum_balance`(IN amount DECIMAL,
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-16 16:29:33
