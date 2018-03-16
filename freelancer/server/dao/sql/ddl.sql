DROP DATABASE flc;
CREATE DATABASE flc;
GRANT ALL on flc.* to 'flcuser'@'localhost';
USE flc;

CREATE TABLE IF NOT EXISTS USER (
  id INTEGER UNIQUE AUTO_INCREMENT,
  username VARCHAR(20) PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  password VARCHAR(100) NOT NULL,
  email VARCHAR(20) NOT NULL UNIQUE,
  image VARCHAR(50),
  about_me VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS SKILL (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  skill_name VARCHAR(20) UNIQUE
);

CREATE TABLE IF NOT EXISTS USER_SKILL(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER,
  skill_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES USER(id),
  FOREIGN KEY (skill_id) REFERENCES SKILL(id),
  UNIQUE `user_skill_uidx` (user_id, skill_id)
);

CREATE TABLE IF NOT EXISTS PROJECT(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  description VARCHAR(200) NOT NULL,
  employer VARCHAR(20) NOT NULL,
  min_budget DECIMAL DEFAULT 0.0,
  max_budget DECIMAL DEFAULT 9999.00,
  start_date DATE NOT NULL,
  status INTEGER NOT NULL DEFAULT 1,
  chosen_bid INTEGER,
  FOREIGN KEY(employer) REFERENCES USER(username),
  FOREIGN KEY(chosen_bid) REFERENCES PROJECT_BID(id)
);

CREATE TABLE IF NOT EXISTS PROJECT_SKILL(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  project_id INTEGER,
  skill_id INTEGER,
  FOREIGN KEY (project_id) REFERENCES PROJECT(id),
  FOREIGN KEY (skill_id) REFERENCES SKILL(id),
  UNIQUE `project_skill_uidx` (project_id, skill_id)
);

CREATE TABLE IF NOT EXISTS PROJECT_FILE(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  project_id INTEGER,
  file  varchar(30),
  FOREIGN KEY (project_id) REFERENCES PROJECT(id)
);

CREATE TABLE IF NOT EXISTS PROJECT_BID(
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  project_id INTEGER NOT NULL,
  bid_price DECIMAL NOT NULL,
  bid_days INTEGER NOT NULL,
  FOREIGN KEY (project_id) REFERENCES PROJECT(id),
  FOREIGN KEY (username) REFERENCES USER(username),
  UNIQUE `project_bid_uidx` (project_id, username)
);