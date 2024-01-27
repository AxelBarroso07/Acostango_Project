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

CREATE TABLE `calendar_class` (
  `id_calendar` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NULL,
  `image` BLOB NULL,
  `day` VARCHAR(20) NOT NULL,
  `time_start` TIME NOT NULL,
  `time_finish` TIME NOT NULL,
  `category` VARCHAR(15) NOT NULL,
  `workshop` BOOLEAN NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- classes rows
INSERT INTO `calendar_class` (`title`, `day`, `time_start`, `time_finish`) VALUES
('AcosTango Afterwork Milonga', 'Monday', '19:00:00', '22:00:00'),
('Beginners', 'Tuesday', '18:00:00', '19:00:00'),
('Intermediate', 'Tuesday', '19:10:00', '20:30:00'),
('Tango Strong', 'Tuesday', '19:30:00', '20:45:00'),
('Practice', 'Wednesday', '20:30:00', '22:00:00'),
('Newcomers Course', 'Thursday', '19:00:00', '22:00:00'),
('Special Workshop', 'Saturday', '18:00:00', '19:00:00'),
('AcosTango Milonga', 'Saturday', '19:00:00', '22:00:00');

INSERT INTO calendar_class(title, day, time_start, time_finish) VALUES ('Beginners', 'Sunday', '20:00:00', '22:00:00');
INSERT INTO calendar_class(title, day, time_start, time_finish) VALUES ('truers', 'Wednesday', '18:00:00', '19:00:00');
-- --------------------------------------------------------
--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id_image` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `photo` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;--