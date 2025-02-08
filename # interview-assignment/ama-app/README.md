# Flight Management System

This project is a Flight Management System built with Next.js. It includes real-time updates using Socket.io and a MongoDB database.

## Table of Contents

- Installation
- Usage
- Scripts
- Project Structure
- Features
- Technologies Used
- Contributing
- License

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/flight-management-system.git
    cd flight-management-system
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. Build the service:

    ```bash
    npm run build:server
    ```

## Usage

To start both the frontend and backend servers concurrently, run:

```bash
npm run dev:all

# Or to run the servers separately:
npm run server

# for frontend:
npm run dev
```
 
## Note 

Prefer to run the server separately 
first spin frontend  : npm run dev
backend server : npm run server