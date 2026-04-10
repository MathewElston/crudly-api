# Crudly API Overview

Crudly-API is a senior capstone project built to give developers a simple way to work with real data through a custom API. Instead of relying on placeholder backends or mock data, the goal was to create a platform where users can interact with actual databases and practice building applications in a more realistic environment.

The project focuses on core CRUD operations while also reflecting how modern backend systems are structured. With a containerized setup and a backend-first approach, Crudly-API is designed to feel closer to a real-world development workflow, making it a useful tool for learning, testing, and prototyping.

### Development Architecture Note

During development, the Nginx reverse proxy and web server Docker services are currently disabled. This decision was made to improve development performance and reduce latency issues related to container-based hot reloading and file synchronization.

The system currently runs in a hybrid setup:

- Backend API and MySQL database run inside Docker containers
- Web client runs locally in development mode

### Technologies Used

- Node.js
- Express.js
- MySQL
- Docker
- Next.js

### Third-Party Services

- Resend Email service used for sending system generated emails
  - Requires a valid RESEND_API_KEY in the .env file
  - API key can be obtained from the Resend dashboard

## Getting Started

### 1. Environment Setup

Create a .env file in the root directory of the project.

Add the following variables:

### API Server

API_SERVER_PORT=3030

API_SERVER_HOST=api-server

### Web Server

WEB_SERVER_PORT=8080

WEB_SERVER_HOST=web-server

### Database (MySQL)

DB_PORT=3306

DB_HOST=mysql

MYSQL_ROOT_PASSWORD=your_root_password

MYSQL_DATABASE=crudlyapi

MYSQL_USER=your_user

MYSQL_PASSWORD=your_password

### Web Secrets

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret

API_TOKEN_SECRET=your_api_token_secret

RESEND_API_KEY=your_resend_api_key

Notes

- Do not change default host values (api-server, web-server, mysql) as they are required for Docker networking.
- Generate secure random values for all \*\_SECRET variables.
- Obtain your RESEND_API_KEY from the Resend dashboard.
- Database is automatically initialized using Docker entrypoint scripts on first container startup.
- Do not commit your .env file to version control.

### 2. Start Docker Containers

From the root directory (where docker-compose.yml is located):

docker compose up --build

This will start:

API server (port 3030)
Web server (port 8080)
MySQL database (port 3306)

If containers are already built:

docker compose up

### 3. Run Web Server (Development Mode)

If running the web server locally navigate to the /web directory:

npm install

npm run dev

Web application will be available at:

http://localhost:8080

### 4. Access MySQL (Optional)

To access the MySQL container shell:

docker compose exec -it mysql-server sh

Then log in:

mysql -u root -p

Password is the value of MYSQL_ROOT_PASSWORD in your .env.
