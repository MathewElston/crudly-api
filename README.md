** INCOMPLETE **
Getting Started

1. Start Docker Containers

From the root directory:

docker compose up --build

Or, if containers are already built:

docker compose up 2. Run the Web Server (Development Mode)
cd web
npm run dev
Access MySQL (Docker)

Open a shell inside the MySQL container:

docker compose exec -it mysql-server sh

Then log in:

mysql -u root -p
