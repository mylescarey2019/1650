# 1650 - Youth Custodial IRA Portal

## Full Stack website to inform about Custodial IRAs 

## Database Schema

```mysql

CREATE DATABASE `invest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `InvestRateTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invest_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `PlanTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `PlanUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `Plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(255) NOT NULL,
  `PlanUserId` int(11) NOT NULL,
  `PlanTypeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PlanUserId` (`PlanUserId`),
  KEY `PlanTypeId` (`PlanTypeId`),
  CONSTRAINT `plans_ibfk_1` FOREIGN KEY (`PlanUserId`) REFERENCES `planusers` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `plans_ibfk_2` FOREIGN KEY (`PlanTypeId`) REFERENCES `plantypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LifeChapters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seq_no` smallint(6) NOT NULL,
  `chapter_name` varchar(255) NOT NULL,
  `start_age` smallint(6) NOT NULL,
  `end_age` smallint(6) NOT NULL,
  `invest_amount` decimal(7,2) NOT NULL,
  `return_pct` decimal(3,1) NOT NULL,
  `inflation_pct` decimal(3,1) NOT NULL,
  `InvestRateTypeId` int(11) DEFAULT NULL,
  `PlanId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `InvestRateTypeId` (`InvestRateTypeId`),
  KEY `PlanId` (`PlanId`),
  CONSTRAINT `lifechapters_ibfk_1` FOREIGN KEY (`InvestRateTypeId`) REFERENCES `investratetypes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lifechapters_ibfk_2` FOREIGN KEY (`PlanId`) REFERENCES `plans` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6296 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

