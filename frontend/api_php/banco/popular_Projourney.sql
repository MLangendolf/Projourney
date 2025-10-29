-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: PROJOURNEY
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.2

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
-- Table structure for table `PJ_ALUNO`
--

DROP TABLE IF EXISTS `PJ_ALUNO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_ALUNO` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(30) NOT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  `area_interesse` varchar(100) DEFAULT NULL,
  `senha` varchar(300) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ALUNO_EMAIL_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_ALUNO`
--

LOCK TABLES `PJ_ALUNO` WRITE;
/*!40000 ALTER TABLE `PJ_ALUNO` DISABLE KEYS */;
INSERT INTO `PJ_ALUNO` VALUES (1,'José Oliveira.','exemplo@gmail.com','1998-06-25','81998989898','Recife-PE','','','$argon2id$v=19$m=65536,t=4,p=1$QnI5RmVWdkIuVnNLZ2ZUbQ$GAjbkobb7KeSZ/VNT6O6I3p6qD5FQk1cfWfjlSwo/JQ');
/*!40000 ALTER TABLE `PJ_ALUNO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PJ_ALUNO_EXPERIENCIA`
--

DROP TABLE IF EXISTS `PJ_ALUNO_EXPERIENCIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_ALUNO_EXPERIENCIA` (
  `PJ_EXPERIENCIA_ID` int NOT NULL,
  `PJ_ALUNO_ID` int NOT NULL,
  PRIMARY KEY (`PJ_EXPERIENCIA_ID`,`PJ_ALUNO_ID`),
  KEY `PJ_ALUNO_ID` (`PJ_ALUNO_ID`),
  CONSTRAINT `PJ_ALUNO_EXPERIENCIA_ibfk_1` FOREIGN KEY (`PJ_EXPERIENCIA_ID`) REFERENCES `PJ_EXPERIENCIA` (`ID`),
  CONSTRAINT `PJ_ALUNO_EXPERIENCIA_ibfk_2` FOREIGN KEY (`PJ_ALUNO_ID`) REFERENCES `PJ_ALUNO` (`ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_ALUNO_EXPERIENCIA`
--

LOCK TABLES `PJ_ALUNO_EXPERIENCIA` WRITE;
/*!40000 ALTER TABLE `PJ_ALUNO_EXPERIENCIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `PJ_ALUNO_EXPERIENCIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PJ_CURSO`
--

DROP TABLE IF EXISTS `PJ_CURSO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_CURSO` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `nivel` enum('Basico','Intermediario','Avançado') NOT NULL,
  `link_curso` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_CURSO`
--

LOCK TABLES `PJ_CURSO` WRITE;
/*!40000 ALTER TABLE `PJ_CURSO` DISABLE KEYS */;
INSERT INTO `PJ_CURSO` VALUES (5,'Python','Basico','https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico'),(6,'JavaScript','Basico','https://www.betrybe.com/curso-de-programacao-javascript-do-zero'),(7,'Java','Basico','https://www.cursoemvideo.com/curso/java-basico/'),(8,'C#','Intermediario','https://learn.microsoft.com/pt-br/training/paths/get-started-c-sharp-part-1/'),(9,'C++','Intermediario','https://www.udemy.com/course/cplusplus-intermediario/'),(10,'PHP','Basico','https://www.cursoemvideo.com/curso/php-basico/'),(11,'TypeScript.','Avançado','https://www.cursou.com.br/informatica/programacao/typescript/'),(12,'Go','Avançado','https://go.dev/doc/'),(13,'Rust','Basico','https://labex.io/pt/courses/quick-start-with-rust'),(14,'Swift','Basico','https://www.cursou.com.br/informatica/programacao/swift/#player'),(15,'Ruby','Intermediario','https://www.cursou.com.br/informatica/ruby/'),(16,'C','Basico','https://www.realizzarecursos.com.br/cursos/curso-de-linguagem-c-gratuito/'),(17,'Lua','Basico','https://www.cursou.com.br/informatica/programacao/programacao-lua/'),(18,'HTML / CSS','Intermediario','https://www.ev.org.br/cursos/crie-um-site-simples-usando-html-css-e-javascript'),(19,'SQL','Intermediario','https://www.ev.org.br/cursos/implementando-banco-de-dados'),(20,'Git / GitHub','Basico','https://www.cursoemvideo.com/curso/curso-de-git-e-github/'),(21,'Docker','Basico','https://www.udemy.com/pt/topic/docker/free/'),(22,'Bash','Basico','https://cursa.app/pt/curso-gratuito/shell-script-bbbh'),(23,'PowerShell','Basico','https://www.cursou.com.br/informatica/windows-powershell/');
/*!40000 ALTER TABLE `PJ_CURSO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PJ_CURSO_TRILHA`
--

DROP TABLE IF EXISTS `PJ_CURSO_TRILHA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_CURSO_TRILHA` (
  `PJ_CURSO_ID` int NOT NULL,
  `PJ_TRILHA_ID` int NOT NULL,
  PRIMARY KEY (`PJ_CURSO_ID`,`PJ_TRILHA_ID`),
  KEY `PJ_TRILHA_ID` (`PJ_TRILHA_ID`),
  CONSTRAINT `PJ_CURSO_TRILHA_ibfk_1` FOREIGN KEY (`PJ_CURSO_ID`) REFERENCES `PJ_CURSO` (`ID`),
  CONSTRAINT `PJ_CURSO_TRILHA_ibfk_2` FOREIGN KEY (`PJ_TRILHA_ID`) REFERENCES `PJ_TRILHA` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_CURSO_TRILHA`
--

LOCK TABLES `PJ_CURSO_TRILHA` WRITE;
/*!40000 ALTER TABLE `PJ_CURSO_TRILHA` DISABLE KEYS */;
INSERT INTO `PJ_CURSO_TRILHA` VALUES (6,2),(11,2),(18,2),(20,2),(5,3),(6,3),(7,3),(8,3),(10,3),(12,3),(15,3),(19,3),(20,3),(21,3),(22,3),(23,3),(6,4),(7,4),(8,4),(14,4),(20,4),(5,5),(6,5),(11,5),(18,5),(19,5),(20,5),(21,5),(22,5),(23,5),(5,6),(19,6),(20,6),(5,7),(12,7),(20,7),(21,7),(22,7),(23,7),(5,8),(7,8),(9,8),(17,8),(5,9),(6,9),(9,9),(16,9),(19,9),(22,9),(23,9);
/*!40000 ALTER TABLE `PJ_CURSO_TRILHA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PJ_EXPERIENCIA`
--

DROP TABLE IF EXISTS `PJ_EXPERIENCIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_EXPERIENCIA` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_EXPERIENCIA`
--

LOCK TABLES `PJ_EXPERIENCIA` WRITE;
/*!40000 ALTER TABLE `PJ_EXPERIENCIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `PJ_EXPERIENCIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PJ_TRILHA`
--

DROP TABLE IF EXISTS `PJ_TRILHA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_TRILHA` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_TRILHA`
--

LOCK TABLES `PJ_TRILHA` WRITE;
/*!40000 ALTER TABLE `PJ_TRILHA` DISABLE KEYS */;
INSERT INTO `PJ_TRILHA` VALUES (2,'Desenvolvimento Frontend'),(3,'Desenvolvimento Backend'),(4,'Desenvolvimento Mobile'),(5,'Desenvolvimento Full Stack'),(6,'Ciência de Dados'),(7,'DevOps e Cloud'),(8,'Inteligência Artificial'),(9,'Segurança da Informação');
/*!40000 ALTER TABLE `PJ_TRILHA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PJ_TRILHA_ALUNO`
--

DROP TABLE IF EXISTS `PJ_TRILHA_ALUNO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PJ_TRILHA_ALUNO` (
  `PJ_TRILHA_ID` int NOT NULL,
  `PJ_ALUNO_ID` int NOT NULL,
  `progresso` enum('Inscrito','Cursando','Suspenso','Concluido') NOT NULL DEFAULT 'Inscrito',
  KEY `PJ_TRILHA_ID` (`PJ_TRILHA_ID`),
  KEY `PJ_ALUNO_ID` (`PJ_ALUNO_ID`),
  CONSTRAINT `PJ_TRILHA_ALUNO_ibfk_1` FOREIGN KEY (`PJ_TRILHA_ID`) REFERENCES `PJ_TRILHA` (`ID`),
  CONSTRAINT `PJ_TRILHA_ALUNO_ibfk_2` FOREIGN KEY (`PJ_ALUNO_ID`) REFERENCES `PJ_ALUNO` (`ID`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PJ_TRILHA_ALUNO`
--

LOCK TABLES `PJ_TRILHA_ALUNO` WRITE;
/*!40000 ALTER TABLE `PJ_TRILHA_ALUNO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PJ_TRILHA_ALUNO` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-04 19:14:52
