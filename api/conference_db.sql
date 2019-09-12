-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 08, 2019 at 11:21 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `conference_db`
--
CREATE DATABASE IF NOT EXISTS `conference_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `conference_db`;

-- --------------------------------------------------------

--
-- Table structure for table `attendee`
--

DROP TABLE IF EXISTS `attendee`;
CREATE TABLE `attendee` (
  `att_id` int(11) NOT NULL,
  `att_type_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendee`
--

INSERT INTO `attendee` (`att_id`, `att_type_id`, `room_id`, `name`, `email`) VALUES
(1, 1, NULL, 'Antony Bauer', 'test@test.net'),
(2, 1, NULL, 'Sofia Knights', 'test@test.net'),
(3, 1, NULL, 'Piotr Bourne', 'test@test.net'),
(4, 1, NULL, 'Arslan Harmon', 'test@test.net'),
(5, 1, NULL, 'Nikki Vance', 'test@test.net'),
(6, 1, NULL, 'Sanaya Whitmore', 'test@test.net'),
(7, 1, NULL, 'Alayah Hough', 'test@test.net'),
(8, 1, NULL, 'Jez Charlton', 'test@test.net'),
(9, 1, NULL, 'Cathy Robbins', 'test@test.net'),
(10, 1, NULL, 'Josh Glover', 'test@test.net'),
(11, 1, NULL, 'Gracie-Mae Giles', 'test@test.net'),
(12, 2, NULL, 'Fahima Emerson', 'test@test.net'),
(13, 2, NULL, 'Tara Thomas', 'test@test.net'),
(14, 2, NULL, 'Boyd Crowther', 'test@test.net'),
(15, 2, NULL, 'Talhah Brennan', 'test@test.net'),
(16, 2, NULL, 'James Brett', 'test@test.net'),
(17, 3, NULL, 'Chester Allen', 'test@test.net'),
(18, 3, NULL, 'Alba Barton', 'test@test.net'),
(19, 3, NULL, 'Genevieve Mellor', 'test@test.net'),
(20, 3, NULL, 'Jaya Rawlings', 'test@test.net'),
(21, 3, NULL, 'Martina Rutledge', 'test@test.net');

-- --------------------------------------------------------

--
-- Table structure for table `attendee_type`
--

DROP TABLE IF EXISTS `attendee_type`;
CREATE TABLE `attendee_type` (
  `att_type_id` int(11) NOT NULL,
  `type_name` varchar(64) NOT NULL,
  `fee` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendee_type`
--

INSERT INTO `attendee_type` (`att_type_id`, `type_name`, `fee`) VALUES
(1, 'Student', 50),
(2, 'Student', 50),
(3, 'Professional', 100),
(4, 'Sponsor', 0);

-- --------------------------------------------------------

--
-- Table structure for table `committee`
--

DROP TABLE IF EXISTS `committee`;
CREATE TABLE `committee` (
  `com_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `chair_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `committee`
--

INSERT INTO `committee` (`com_id`, `name`, `chair_id`) VALUES
(1, 'Program Committee', 1),
(2, 'Registration Committee', 2),
(3, 'Sponsorship Committee', 3);

-- --------------------------------------------------------

--
-- Table structure for table `committee_member`
--

DROP TABLE IF EXISTS `committee_member`;
CREATE TABLE `committee_member` (
  `mem_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `committee_member`
--

INSERT INTO `committee_member` (`mem_id`, `com_id`) VALUES
(1, 2),
(4, 2),
(5, 1),
(6, 2),
(7, 3),
(8, 3),
(9, 3),
(10, 1),
(11, 1),
(12, 1),
(13, 2),
(14, 2);

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `job_id` int(11) NOT NULL,
  `spn_id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `city` varchar(64) NOT NULL,
  `province` varchar(32) NOT NULL,
  `pay_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`job_id`, `spn_id`, `title`, `city`, `province`, `pay_rate`) VALUES
(1, 2, 'Software Developer', 'Markham', 'Ontario', 60000),
(2, 2, 'Web Developer', 'Scarborough', 'Ontario', 60000),
(3, 3, 'Accountant', 'Kingston', 'Ontario', 70000),
(4, 2, 'Junior Software Developer', 'Toronto', 'Ontario', 80000),
(5, 4, 'Lead Software Developer', 'Toronto', 'Ontario', 100000);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `mem_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `name`) VALUES
(1, 'Umaiza Mcgee'),
(2, 'Samah Garrett'),
(3, 'Nadeem Duarte'),
(4, 'Abiha Boyce'),
(5, 'Samual Khan'),
(6, 'Danielius Tate'),
(7, 'Eddie Owens'),
(8, 'Branden Ferrell'),
(9, 'Aras Hail'),
(10, 'Erin Grimes'),
(11, 'Jaylen Lynn'),
(12, 'Fearne Raymond'),
(13, 'Bryony Vinson'),
(14, 'Alfie Pruitt'),
(15, 'Luella Alexander'),
(16, 'Rimsha Gallegos'),
(17, 'Danielle Stafford');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `building` varchar(64) NOT NULL,
  `room_number` int(11) NOT NULL,
  `capacity` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `building`, `room_number`, `capacity`) VALUES
(1, 'Main Building', 101, 0),
(2, 'Main Building', 102, 0),
(3, 'Main Building', 103, 0),
(4, 'Main Building', 104, 0),
(5, 'Main Building', 105, 0),
(6, 'Main Building', 106, 0),
(7, 'Hotel', 20, 2),
(8, 'Hotel', 21, 1),
(9, 'Hotel', 22, 2),
(10, 'Hotel', 23, 1),
(11, 'Hotel', 24, 2),
(12, 'Hotel', 25, 1);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
CREATE TABLE `session` (
  `ses_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `room_id` int(11) NOT NULL,
  `timeslot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`ses_id`, `name`, `room_id`, `timeslot_id`) VALUES
(1, 'Learn to program', 1, 1),
(2, 'Learn to hack', 2, 4),
(3, 'Learn to design', 3, 3),
(4, 'Learn to game design', 4, 2),
(5, 'Learn to maths', 5, 4),
(6, 'Learn to network', 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `session_speaker`
--

DROP TABLE IF EXISTS `session_speaker`;
CREATE TABLE `session_speaker` (
  `ses_id` int(11) NOT NULL,
  `att_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session_speaker`
--

INSERT INTO `session_speaker` (`ses_id`, `att_id`) VALUES
(1, 1),
(2, 2),
(2, 7),
(3, 6),
(4, 5),
(5, 4),
(6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sponsor`
--

DROP TABLE IF EXISTS `sponsor`;
CREATE TABLE `sponsor` (
  `spn_id` int(11) NOT NULL,
  `tier_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `emails_sent` tinyint(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sponsor`
--

INSERT INTO `sponsor` (`spn_id`, `tier_id`, `name`, `emails_sent`) VALUES
(2, 4, 'Wilson Industries', 0),
(3, 1, 'Account Decorate Fit', 0),
(4, 1, 'Fitting Schmitting', 0),
(5, 2, 'Donaldson, Wilson And Pitt, Associates', 0),
(6, 3, 'Account Account Account', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sponsor_attendee`
--

DROP TABLE IF EXISTS `sponsor_attendee`;
CREATE TABLE `sponsor_attendee` (
  `spn_id` int(11) NOT NULL,
  `att_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sponsor_attendee`
--

INSERT INTO `sponsor_attendee` (`spn_id`, `att_id`) VALUES
(2, 18),
(2, 21),
(3, 19),
(4, 20),
(5, 17);

-- --------------------------------------------------------

--
-- Table structure for table `sponsor_tier`
--

DROP TABLE IF EXISTS `sponsor_tier`;
CREATE TABLE `sponsor_tier` (
  `tier_id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `fund_level` int(11) NOT NULL,
  `emails_allowed` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sponsor_tier`
--

INSERT INTO `sponsor_tier` (`tier_id`, `name`, `fund_level`, `emails_allowed`) VALUES
(1, 'Bronze', 1000, 0),
(2, 'Silver', 3000, 3),
(3, 'Gold', 5000, 4),
(4, 'Platinum', 10000, 5);

-- --------------------------------------------------------

--
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
CREATE TABLE `timeslot` (
  `timeslot_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `timeslot`
--

INSERT INTO `timeslot` (`timeslot_id`, `date`, `start_time`, `end_time`) VALUES
(1, '2019-01-01', '10:00:00', '13:00:00'),
(2, '2019-01-01', '12:00:00', '13:00:00'),
(3, '2019-01-01', '12:00:00', '13:00:00'),
(4, '2019-01-01', '17:00:00', '18:00:00'),
(5, '2019-01-01', '18:00:00', '20:00:00'),
(6, '2019-01-02', '15:00:00', '18:00:00'),
(7, '2019-01-02', '12:00:00', '114:00:00'),
(8, '2019-01-02', '11:00:00', '13:00:00'),
(9, '2019-01-02', '09:00:00', '11:00:00'),
(10, '2019-01-02', '08:00:00', '10:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendee`
--
ALTER TABLE `attendee`
  ADD PRIMARY KEY (`att_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `att_type_id` (`att_type_id`);

--
-- Indexes for table `attendee_type`
--
ALTER TABLE `attendee_type`
  ADD PRIMARY KEY (`att_type_id`);

--
-- Indexes for table `committee`
--
ALTER TABLE `committee`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `committee_ibfk_1` (`chair_id`);

--
-- Indexes for table `committee_member`
--
ALTER TABLE `committee_member`
  ADD PRIMARY KEY (`mem_id`,`com_id`),
  ADD KEY `mem_id` (`mem_id`),
  ADD KEY `com_id` (`com_id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `spn_id` (`spn_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mem_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD UNIQUE KEY `room_number` (`room_number`,`building`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`ses_id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `timeslot_id` (`timeslot_id`);

--
-- Indexes for table `session_speaker`
--
ALTER TABLE `session_speaker`
  ADD PRIMARY KEY (`ses_id`,`att_id`),
  ADD KEY `ses_id` (`ses_id`),
  ADD KEY `att_id` (`att_id`);

--
-- Indexes for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`spn_id`),
  ADD KEY `tier_id` (`tier_id`);

--
-- Indexes for table `sponsor_attendee`
--
ALTER TABLE `sponsor_attendee`
  ADD PRIMARY KEY (`spn_id`,`att_id`),
  ADD UNIQUE KEY `att_id` (`att_id`),
  ADD KEY `spn_id` (`spn_id`);

--
-- Indexes for table `sponsor_tier`
--
ALTER TABLE `sponsor_tier`
  ADD PRIMARY KEY (`tier_id`);

--
-- Indexes for table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`timeslot_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendee`
--
ALTER TABLE `attendee`
  MODIFY `att_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `attendee_type`
--
ALTER TABLE `attendee_type`
  MODIFY `att_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `committee`
--
ALTER TABLE `committee`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `mem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `ses_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sponsor`
--
ALTER TABLE `sponsor`
  MODIFY `spn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sponsor_tier`
--
ALTER TABLE `sponsor_tier`
  MODIFY `tier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `timeslot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendee`
--
ALTER TABLE `attendee`
  ADD CONSTRAINT `attendee_ibfk_1` FOREIGN KEY (`att_type_id`) REFERENCES `attendee_type` (`att_type_id`),
  ADD CONSTRAINT `attendee_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);

--
-- Constraints for table `committee`
--
ALTER TABLE `committee`
  ADD CONSTRAINT `committee_ibfk_1` FOREIGN KEY (`chair_id`) REFERENCES `member` (`mem_id`);

--
-- Constraints for table `committee_member`
--
ALTER TABLE `committee_member`
  ADD CONSTRAINT `committee_member_ibfk_1` FOREIGN KEY (`com_id`) REFERENCES `committee` (`com_id`),
  ADD CONSTRAINT `committee_member_ibfk_2` FOREIGN KEY (`mem_id`) REFERENCES `member` (`mem_id`);

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_ibfk_1` FOREIGN KEY (`spn_id`) REFERENCES `sponsor` (`spn_id`);

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`),
  ADD CONSTRAINT `session_ibfk_2` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslot` (`timeslot_id`);

--
-- Constraints for table `session_speaker`
--
ALTER TABLE `session_speaker`
  ADD CONSTRAINT `session_speaker_ibfk_1` FOREIGN KEY (`att_id`) REFERENCES `attendee` (`att_id`),
  ADD CONSTRAINT `session_speaker_ibfk_2` FOREIGN KEY (`ses_id`) REFERENCES `session` (`ses_id`);

--
-- Constraints for table `sponsor`
--
ALTER TABLE `sponsor`
  ADD CONSTRAINT `sponsor_ibfk_1` FOREIGN KEY (`tier_id`) REFERENCES `sponsor_tier` (`tier_id`);

--
-- Constraints for table `sponsor_attendee`
--
ALTER TABLE `sponsor_attendee`
  ADD CONSTRAINT `sponsor_attendee_ibfk_1` FOREIGN KEY (`att_id`) REFERENCES `attendee` (`att_id`),
  ADD CONSTRAINT `sponsor_attendee_ibfk_2` FOREIGN KEY (`spn_id`) REFERENCES `sponsor` (`spn_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
