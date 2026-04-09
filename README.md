Overview

Crudly-API is a senior capstone project built to give developers a simple way to work with real data through a custom API. Instead of relying on placeholder backends or mock data, the goal was to create a platform where users can interact with actual databases and practice building applications in a more realistic environment.

The project focuses on core CRUD operations while also reflecting how modern backend systems are structured. With a containerized setup and a backend-first approach, Crudly-API is designed to feel closer to a real-world development workflow, making it a useful tool for learning, testing, and prototyping.

Technologies Used
- Node.js
- Express.js
- MySQL
- Docker
- Next.js

** INCOMPLETE SETUP AND GETSTARTED SECTION **

Getting Started

1. Start Docker Containers

From the root directory:

docker compose up --build

Or, if containers are already built:

docker compose up

2. Run the Web Server (Development Mode)
   cd web
   npm run dev
   Access MySQL (Docker)

Open a shell inside the MySQL container:

docker compose exec -it mysql-server sh

Then log in:

mysql -u root -p
