CREATE DATABASE IF NOT EXISTS crudlyapi;
USE crudlyapi;

CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `email` varchar(255)
);

CREATE TABLE `Users_Credentials` (
  `user_id` int UNIQUE,
  `password_hash` varchar(255),
  `password_reset_token` varchar(255),
  `password_reset_expires` timestamp
);

CREATE TABLE `User_API_Key` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int UNIQUE,
  `api_key` varchar(255),
  `is_active` bool,
  `call_count` int,
  `call_per_min` int,
  `created_at` timestamp,
  `last_used_at` timestamp,
  `reset_date` timestamp,
  `security_config_id` int
);

CREATE TABLE `User_Projects` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `security_config_id` int,
  `project_name` varchar(255),
  `schema_definition` json,
  `records` json,
  `created_at` timestamp
);

CREATE TABLE `User_Security_Config` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `min_password_length` int,
  `require_uppercase` bool,
  `require_numbers` bool,
  `require_special_chars` bool
);

CREATE TABLE `Project_Security_Config` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `table_count_cap` int,
  `field_count_cap` int,
  `records_count_cap` int,
  `project_count_cap` int
);

CREATE TABLE `API_Security_Config` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `call_per_month_cap` int,
  `call_per_min_cap` int
);

CREATE TABLE `API_Event_Logs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `project_id` int,
  `api_id` int,
  `event_timestamp` timestamp,
  `request_type` enum('GET','POST','PUT','PATCH','DELETE'),
  `endpoint` varchar(255),
  `status_code` varchar(255)
);

ALTER TABLE `Users_Credentials` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `User_API_Key` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `User_API_Key` ADD FOREIGN KEY (`security_config_id`) REFERENCES `API_Security_Config` (`id`);

ALTER TABLE `User_Projects` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `User_Projects` ADD FOREIGN KEY (`security_config_id`) REFERENCES `Project_Security_Config` (`id`);

ALTER TABLE `API_Event_Logs` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `API_Event_Logs` ADD FOREIGN KEY (`project_id`) REFERENCES `User_Projects` (`id`);

ALTER TABLE `API_Event_Logs` ADD FOREIGN KEY (`api_id`) REFERENCES `User_API_Key` (`id`);
