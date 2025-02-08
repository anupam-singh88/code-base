# Task Management API

## Overview

This project is a task management application backend developed using Node.js with Express.js, Sequelize ORM, and PostgreSQL. It provides endpoints to manage tasks with CRUD operations.

## Features

- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/{task_id}**: Update a task's status.
- **DELETE /api/tasks/{task_id}**: Delete a task.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>

2. **Install Dependency**

   ```bash
   npm install


3. **Setup Database**

    Create a new PostgreSQL database and update the database credentials in the `.env` file.
    
    ```bash
    DATABASE_URL=postgres://user:password@localhost:5432/task_management

4. **run database migrations**
    
        ```bash
        npx sequelize-cli db:migrate


5. **Start the server**

   ```bash
   npm start


Prod URl : https://predixionai-notes-backend.onrender.com/