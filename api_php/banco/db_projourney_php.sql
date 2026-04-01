-- CONFIGURAÇÕES:
--
-- mysql -u <usuário> -p < db_projourney_php.sql
--
-- CREATE USER '<userName>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
--
-- ALTER USER '<userName>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>'; 
--
--
--

CREATE DATABASE projourney_php;
USE projourney_php;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(60) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(300) NOT NULL,
  tipo ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  data_nascimento DATE,
  telefone VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT USERS_EMAIL_UNIQUE UNIQUE (email)
);

CREATE TABLE trilha (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);



CREATE TABLE trilha_aluno (
  trilha_id INT NOT NULL,
  aluno_id INT NOT NULL,
  progresso ENUM('Inscrito', 'Cursando', 'Suspenso', 'Concluido') NOT NULL DEFAULT 'Inscrito',
  FOREIGN KEY (trilha_id) REFERENCES trilha (id),
  FOREIGN KEY (aluno_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);


CREATE TABLE experiencia (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE aluno_experiencia (
  experiencia_id INT NOT NULL,
  aluno_id INT NOT NULL,
  PRIMARY KEY (experiencia_id, aluno_id),
  FOREIGN KEY (experiencia_id) REFERENCES experiencia (id),
  FOREIGN KEY (aluno_id) REFERENCES users (id)
      ON DELETE CASCADE 
      ON UPDATE RESTRICT
);


CREATE TABLE curso (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  nivel ENUM('Basico', 'Intermediario', 'Avançado') NOT NULL,
  link_curso VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE curso_trilha (
  curso_id INT NOT NULL,
  trilha_id INT NOT NULL,
  PRIMARY KEY (curso_id, trilha_id),
  FOREIGN KEY (curso_id) REFERENCES curso (id), 
  FOREIGN KEY (trilha_id) REFERENCES trilha (id)
);

