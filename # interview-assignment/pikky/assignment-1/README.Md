# Express.js API with Redis Caching

This is a production-grade Express.js application that integrates Redis caching to enhance performance. The application serves food-related data and includes robust error handling to ensure graceful degradation if Redis is unavailable.

## Features

- **Redis Caching**: Caches frequently accessed data to improve performance.
- **Error Handling**: Graceful handling of Redis connection issues and fallback mechanisms.
- **Modular Architecture**: Separates concerns into services and controllers for better maintainability.

## Setup

### Prerequisites

- Node.js (v18.x or later recommended)
- Redis server (running on port 6379)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository

2. **Install Dependency**

    ```bash
    npm install

3. **Set Environment Variables**

    Create a new file named `.env` and add the following configuration. Replace the values with your Redis server details.

    ```env
    PORT=3000
    REDIS_HOST=localhost
    REDIS_PORT=6379

4. **Start Redis Server**
    
    Make sure your Redis server is running on port 6379. You can start the Redis server using the following command:

    ```bash
    redis-server

5. **Run the Application**

    ```bash
    npm start