# Task List Application (Backend)

This is a Express application for managing tasks with user registration and authentication. Follow the steps below to set up and run the project locally.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher) or [Yarn](https://yarnpkg.com/) (version 1.x or higher)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/muskansingh17/task-manager-backend.git
   cd task-list-app
   ```

2. **Install dependencies:**
   ```
    npm install
   ```

## Configuration

1. **To configure the API base URL, create `.env` file in root folder and put following variables:**

    ```
    // .env
    MONGO_URL=mongodb://localhost:27017/task-manager
    JWT_SECRET= your-secret-key
    JWT_EXPIRATION_TIME=1d
    PORT=5000
    ```

## Running the Application

    ```
    npm start
    ```