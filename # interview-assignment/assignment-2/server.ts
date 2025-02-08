// // socket-server.ts
// import http from 'http';
// import { Server } from 'socket.io';

// const server = http.createServer();
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Adjust CORS settings for production
//   },
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('message', (msg: string) => {
//     console.log('message received:', msg);
//     io.emit('message', msg); // Broadcast message to all clients
//   });
// });

// server.listen(4000, () => {
//   console.log('Socket.IO server running on http://localhost:4000');
// });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket :any) => {
    console.log('a user connected');
    socket.on('message', (msg :any) => {
        console.log(msg)
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
