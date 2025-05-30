/* Create a user and single project*/
INSERT INTO `Users`
VALUES(1,"test_username2", "test@email.net2");

INSERT INTO `Project_Security_Config`
VALUES (1,10,10,5000,10);

INSERT INTO `User_Projects`(user_id, security_config_id, project_name)
VALUES (1,1,"Test Project");