USE flc;

INSERT INTO USER (username, password, email)
VALUES ('xyz', '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6', 'xyz@email.com');
INSERT INTO USER (username, first_name, last_name, password, email, about_me)
VALUES
  ('abc', 'Chris', 'Li', '$2a$10$bNqsANQaxojDrovhLCF2DeaSxXKMA6l1iss/nzzBkS/SdhhtWCPT6', 'abc@world.com', 'This is Me');

INSERT INTO PROJECT (title, description, employer, min_budget, max_budget, start_date)
VALUES ('Project 1', 'This is Project 1', 'abc', 300.0, 400.0, STR_TO_DATE('01/23/2018', '%m/%d/%Y'));
INSERT INTO PROJECT (title, description, employer, min_budget, max_budget, start_date)
VALUES ('Project 2', 'Hello hello project 2', 'abc', 400.0, 600.0, STR_TO_DATE('12/24/2017', '%m/%d/%Y'));
INSERT INTO PROJECT (title, description, employer, min_budget, max_budget, start_date)
VALUES ('Project 3', 'Here again project 3', 'xyz', 500.0, 800.0, STR_TO_DATE('02/12/2018', '%m/%d/%Y'));

