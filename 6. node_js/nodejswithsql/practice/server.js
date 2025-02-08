const express = require('express');
const db = require('./db');

const app = express();

const { syncDbINOrder } = require('./models')

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');

    db.authenticate()
        .then(() => {
            console.log('Database connected');

            syncDbINOrder();
        })
        .catch(err => {
            console.log('Error: ' + err);
        });
});