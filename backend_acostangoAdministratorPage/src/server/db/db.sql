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
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL,
  `day` VARCHAR(20) NOT NULL,
  `date` DATE NULL,
  `location` VARCHAR(50) NULL,
  `price` DECIMAL(7,2) NULL,
  `time_start` TIME NOT NULL,
  `time_finish` TIME NULL,
  `category` VARCHAR(15) NOT NULL,
  `workshop` BOOLEAN NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- classes rows
INSERT INTO `calendar` (`title`, `description`, `day`, `time_start`, `time_finish`, `category`, `workshop`) VALUES
                      ('AcosTango Afterwork Milonga', 'Join us and bring your friends! We look forward to dancing with you!', 'Monday', '19:00:00', '22:00:00', 'class', false),
                      ('Beginners', 'This is where you start your journey into Tango! We look forward to meeting you!', 'Tuesday', '18:00:00', '19:00:00', 'class', false),
                      ('Intermediate', 'This is where you start your journey into Tango!', 'Tuesday', '19:10:00', '20:30:00', 'class', false),
                      ('Tango Strong', 'Join us and bring your friends! We look forward to dancing with you! We look forward to dancing with you!', 'Tuesday', '19:30:00', '20:45:00', 'class', false),
                      ('Practice', 'Join us and bring your friends! and bring your friends! We look forward to dancing with you!', 'Wednesday', '20:30:00', '22:00:00', 'class', false),
                      ('Newcomers Course', 'Join us and bring your friends! and bring your friends! We look forward to dancing with you!', 'Thursday', '19:00:00', '22:00:00', 'class', false),
                      ('Special Workshop', 'This is where you start your journey into Tango°', 'Saturday', '18:00:00', '19:00:00', 'class', true),
                      ('AcosTango Milonga', 'Join us and bring your friends! We look forward to dancing with you!', 'Saturday', '19:00:00', '22:00:00', 'class', false)
;

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
