# Settlement Management System

This project is a Settlement Management System built with Node.js, Express, Sequelize (PostgreSQL), and React. It includes WebSocket support via `socket.io` for real-time notifications.

## Prerequisites

Before running this project, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (version 12.x or later)

## Setup Instructions

### Backend Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/momin0606/leyline-backend.git
    cd <repository-directory>  //default value is leyline-backend
    ```

2.  **Install backend dependencies:**

    ```sh
    npm install
    ```

3.  **Create a `.env` file in the `leyline-backend` directory with the following content:**

    ```plaintext
    PORT=5000
    JWT_SECRET=your_jwt_secret
    ```

4.  **Update the `config/config` file in the `leyline-backend` directory with the following content:**

        ```plaintext

    {
    "development": {
    "username": "your_postgres_username", //default is "postgres"
    "password": "your_postgres_password", //default is "postgres"
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
    }
    }

    ```

    ```

5.  **Set up the database:**

    Ensure PostgreSQL is running and create a database with the name you specified in the `config/config.json` file in the `leyline-backend` directory.

    Then run the migrations and seeders:

    ```sh
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```

6.  **Start the backend server:**

    ```sh
    npm start
    ```

### Frontend Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/momin0606/leyline-ui.git
    cd <repository-directory>  //default value is leyline-ui
    ```

2.  **Install frontend dependencies:**

    ```sh
    npm install
    ```

3.  **Start the frontend development server:**

    ```sh
    npm start
    ```

### Running the Project

After completing the setup steps, you should have the backend server running on `http://localhost:5000` and the frontend server running on `http://localhost:3000`.

You can now access the application in your web browser at `http://localhost:3000`.

### WebSocket Setup

The backend server includes WebSocket support via `socket.io` for real-time notifications. The WebSocket connection is initialized and authenticated using a token.

### Available API Endpoints

- **Auth Routes:**

  - `POST /auth/signup` - Register a new user
  - `POST /auth/signin` - Log in a user and return a JWT

- **User Routes:**

  - `GET /users` - Get a list of all users (excluding the requesting user)

- **Settlement Routes:**
  - `GET /settlements` - Get a list of all settlements
  - `GET /settlements/:id` - Get details of a specific settlement by ID
  - `POST /settlements` - Create a new settlement
  - `PUT /settlements` - Update an existing settlement

### Project Structure

- `leyline-backend/` - Contains the backend code (Express server, Sequelize models, migrations, routes)
- `leyline-ui/` - Contains the frontend code (React application)

### Technologies Used

- **Backend:**

  - Node.js
  - Express
  - Sequelize (PostgreSQL)
  - Socket.io
  - JWT for authentication

- **Frontend:**
  - React
  - Axios for API requests
