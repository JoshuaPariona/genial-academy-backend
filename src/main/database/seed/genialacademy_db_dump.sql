-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: genialacademy_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `university_id` int DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `description` varchar(800) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_b7c3c95e1c6dfe264ba33bf482` (`slug`),
  KEY `FK_242bc118ec3dc411bd944f7d0f8` (`university_id`),
  CONSTRAINT `FK_242bc118ec3dc411bd944f7d0f8` FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_users`
--

DROP TABLE IF EXISTS `auth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_users` (
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `status` enum('active','suspended') NOT NULL DEFAULT 'active',
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_13d8b49e55a8b06bee6bbc828f` (`email`),
  UNIQUE KEY `IDX_8852f85982c3947febf76e3681` (`username`),
  UNIQUE KEY `IDX_a83a2c4135cbbed32dd980fad9` (`user_id`),
  UNIQUE KEY `REL_a83a2c4135cbbed32dd980fad9` (`user_id`),
  CONSTRAINT `FK_a83a2c4135cbbed32dd980fad90` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `careers`
--

DROP TABLE IF EXISTS `careers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `careers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `description` varchar(800) NOT NULL,
  `title` varchar(255) NOT NULL,
  `area_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_919062b6f34d921a0fe47ef46b` (`slug`),
  KEY `FK_dcaf482c7577b53b6088329f666` (`area_id`),
  CONSTRAINT `FK_dcaf482c7577b53b6088329f666` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `description` varchar(800) NOT NULL,
  `title` varchar(255) NOT NULL,
  `area_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a3bb2d01cfa0f95bc5e034e1b7` (`slug`),
  KEY `FK_4e6bc1fcd51edba445928250bdb` (`area_id`),
  CONSTRAINT `FK_4e6bc1fcd51edba445928250bdb` FOREIGN KEY (`area_id`) REFERENCES `areas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `level` enum('basic','intermediate','advanced') NOT NULL,
  `coin_multiplier` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `link` varchar(2048) NOT NULL,
  `topic_id` int DEFAULT NULL,
  `type` enum('document','image','video') NOT NULL DEFAULT 'document',
  PRIMARY KEY (`id`),
  KEY `FK_784fdeb6190952576fdd6f44c9b` (`topic_id`),
  CONSTRAINT `FK_784fdeb6190952576fdd6f44c9b` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `option` varchar(255) NOT NULL,
  `is_correct` tinyint NOT NULL DEFAULT '0',
  `question_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2bdd03245b8cb040130fe16f21d` (`question_id`),
  CONSTRAINT `FK_2bdd03245b8cb040130fe16f21d` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `statement` varchar(500) NOT NULL,
  `admission_process` varchar(20) DEFAULT NULL,
  `topic_id` int DEFAULT NULL,
  `level_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e29a77ea64df3fb567c4c200a9e` (`topic_id`),
  KEY `FK_97cb5a1d1eea1692c817d7e5147` (`level_id`),
  CONSTRAINT `FK_97cb5a1d1eea1692c817d7e5147` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  CONSTRAINT `FK_e29a77ea64df3fb567c4c200a9e` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `steps`
--

DROP TABLE IF EXISTS `steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `steps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `statement` varchar(400) NOT NULL,
  `index` int NOT NULL,
  `university_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aed142af218c1f5328d5666f5aa` (`university_id`),
  CONSTRAINT `FK_aed142af218c1f5328d5666f5aa` FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `description` varchar(800) NOT NULL,
  `title` varchar(255) NOT NULL,
  `course_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97c66ab0029f49fde30517f819` (`slug`),
  KEY `FK_ef19a29ccdfb8903f09e924b66c` (`course_id`),
  CONSTRAINT `FK_ef19a29ccdfb8903f09e924b66c` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(20) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `description` varchar(800) NOT NULL,
  `title` varchar(255) NOT NULL,
  `acronym` varchar(10) NOT NULL,
  `areas_name` varchar(100) NOT NULL,
  `discover_name` varchar(500) NOT NULL,
  `admission_img` varchar(2048) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e8b097a46f3c18a01b923f7e96` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `display_sur_name` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `career` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `public_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12  4:47:18
