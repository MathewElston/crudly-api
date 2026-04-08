-- HOW TO START --

1. Ensure the containers are online.
   Clean Build All Containers and go online.
   cd into the parents directory of the project.
   docker compose up --build or docker compose up

2. To run the web server in dev mode. cd into the web directory
   npm run dev

-- Remote into the mysql server --
Run a shell instance on the mysql server using docker
docker compose exec -it mysql-server sh
inside the shell run:
mysql -u root -p
