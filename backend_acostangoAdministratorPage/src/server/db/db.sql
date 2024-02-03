-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2024 at 01:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acostango`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar_class`
--
CREATE DATABASE acostango;

USE acostango;

CREATE TABLE `calendar` (
  `id_calendar` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(255) NULL,
  `day` VARCHAR(20) NOT NULL,
  `date` DATE NULL,
  `location` VARCHAR(50) NULL,
  `price` INT NOT NULL,
  `block` INT NULL,
  `time_start` TIME NOT NULL,
  `time_finish` TIME NULL,
  `category` VARCHAR(15) NOT NULL,
  `workshop` BOOLEAN NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- classes and workshops rows
INSERT INTO `calendar` (`title`, `description`, `day`, `price`, `block`, `time_start`, `time_finish`, `category`, `workshop`) VALUES
                      ('Intermediate & Advance', 'These classes are aimed at people who already have experience in dancing tango. It is necessary to come as a couple to take the advanced classes. In this class technical concepts and complex movements of Tango are handled. We will wait for you!!!', 'Monday', 15, 180, '18:00:00', '19:00:00', 'class', false),
                      ('AcosTango Afterwork Milonga', 'Come dance right after work, switch off dancing after a day of work and go to bed early.
                      For all those who get up early to be able to go to work the next day. Our milonga is a great solution', 'Monday', 10, null, '19:00:00', '22:00:00', 'class', false),
                      ('Tango Technique', 'This class is intended for learning and perfecting the technique of both men and women in tango. We will work on axis, weight shifts, pivots, walking, turns, stumbles and embellishments. A class intended for those who already dance but also for those who want to get in touch with tango for the first time', 'Tuesday', 20, 140, '18:00:00', '19:15:00', 'class', false),
                      ('Tango Strong', 'Tango Strong is a movement discipline, focused on the one hand to maintain a healthy body and on the other to develop, strengthen and give flexibility to the body through typical movements of tango dance.
                      It is an individual job for all types of people, especially Tango dancers who want to improve their physical condition', 'Tuesday', 20, 140, '19:30:00', '20:45:00', 'class', false),
                      ('Beginners', 'These are classes for beginners, people who are starting out for the first time or who have a very little knowledge of tango dancing.', 'Wednesday', 15, 180, '18:00:00', '19:00:00', 'class', false),
                      ('Intermediate & Advance', 'These classes are aimed at people who already have experience in dancing tango. It is necessary to come as a couple to take the advanced classes. In this class technical concepts and complex movements of Tango are handled. We will wait for you!!!', 'Wednesday', 25, 180, '19:00:00', '20:30:00', 'class', false),
                      ('Beginners', 'These are classes for beginners, people who are starting out for the first time or who have a very little knowledge of tango dancing.', 'Friday', 25, 180, '19:00:00', '21:00:00', 'class', false),
                      ('Special Workshop', 'These workshops are thematic, they work on a specific tango theme or movement, for example sacda, volleys, hooks or sweeps or a musical rhythm such as milonga, waltz or musicality with different tango composers and every three weeks we change the theme', 'Saturday', 25, null, '19:00:00', '20:30:00', 'class', true),
                      ('Acostango Milonga', 'Every Saturday night we organize our milonga, a special night, with very good music and a splendid floor. Very close to the center which makes it very accessible', 'Saturday', 10, null, '20:30:00', '22:00:00', 'class', false)

-- INSERT INTO calendar_class(title, day, time_start, time_finish) VALUES ('Beginners', 'Sunday', '20:00:00', '22:00:00');
-- INSERT INTO calendar_class(title, day, time_start, time_finish) VALUES ('truers', 'Wednesday', '18:00:00', '19:00:00');
-- -- Workshop row
-- INSERT INTO calendar_class(title, day, time_start, time_finish, category, workshop) VALUES ('Workshop 1', 'Wednesday', '19:00:00', '20:00:00', 'class', 1);
-- -- --------------------------------------------------------
-- --
-- -- Table structure for table `gallery`
-- --

-- CREATE TABLE `gallery` (
--   `id_image` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
--   `photo` VARCHAR(255) DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;--
