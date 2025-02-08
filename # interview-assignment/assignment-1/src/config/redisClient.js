const { createClient } = require('@redis/client');

let client;

const initializeRedisClient = async () => {
    try {
        client = createClient({
            url: 'redis://localhost:6379',
        });

        client.on('error', (err) => {
            console.error('Redis error:', err);
        });

        // Connect the client
        await client.connect();
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        client = null; // Set client to null to indicate it's not available
    }
};

initializeRedisClient();

module.exports = {
    client,
};
