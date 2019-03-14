-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema betess
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema betess
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `betess` DEFAULT CHARACTER SET utf8 ;
USE `betess` ;

-- -----------------------------------------------------
-- Table `betess`.`Player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Player` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `phoneNo` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` NVARCHAR(20) NOT NULL,
  `balance` DECIMAL(9,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`Team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Team` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`Sport`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Sport` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Event` (
  `id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `result` VARCHAR(45) NOT NULL,
  `odd_home` DECIMAL(5,2) NOT NULL,
  `odd_away` DECIMAL(5,2) NOT NULL,
  `odd_draw` DECIMAL(5,2) NOT NULL,
  `Team1_id` INT NOT NULL,
  `Team2_id` INT NOT NULL,
  `Sport_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Event_Team1_idx` (`Team1_id` ASC),
  INDEX `fk_Event_Team2_idx` (`Team2_id` ASC),
  INDEX `fk_Event_Sport1_idx` (`Sport_id` ASC),
  CONSTRAINT `fk_Event_Team1`
    FOREIGN KEY (`Team1_id`)
    REFERENCES `betess`.`Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Event_Team2`
    FOREIGN KEY (`Team2_id`)
    REFERENCES `betess`.`Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Event_Sport1`
    FOREIGN KEY (`Sport_id`)
    REFERENCES `betess`.`Sport` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`Bet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Bet` (
  `id` INT NOT NULL,
  `amount` DECIMAL(9,2) NOT NULL,
  `result` VARCHAR(45) NOT NULL,
  `Player_id` INT NOT NULL,
  `Event_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Bet_Player1_idx` (`Player_id` ASC),
  INDEX `fk_Bet_Event1_idx` (`Event_id` ASC),
  CONSTRAINT `fk_Bet_Player1`
    FOREIGN KEY (`Player_id`)
    REFERENCES `betess`.`Player` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bet_Event1`
    FOREIGN KEY (`Event_id`)
    REFERENCES `betess`.`Event` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`Notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Notification` (
  `id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `balanceBet` DECIMAL(9,2) NOT NULL,
  `Player_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Notification_Player_idx` (`Player_id` ASC),
  CONSTRAINT `fk_Notification_Player`
    FOREIGN KEY (`Player_id`)
    REFERENCES `betess`.`Player` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`League`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`League` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `Sport_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_League_Sport1_idx` (`Sport_id` ASC),
  CONSTRAINT `fk_League_Sport1`
    FOREIGN KEY (`Sport_id`)
    REFERENCES `betess`.`Sport` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betess`.`Team_League`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betess`.`Team_League` (
  `id` INT NOT NULL,
  `Team_id` INT NOT NULL,
  `League_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Team_League_Team1_idx` (`Team_id` ASC),
  INDEX `fk_Team_League_League1_idx` (`League_id` ASC),
  CONSTRAINT `fk_Team_League_Team1`
    FOREIGN KEY (`Team_id`)
    REFERENCES `betess`.`Team` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Team_League_League1`
    FOREIGN KEY (`League_id`)
    REFERENCES `betess`.`League` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
