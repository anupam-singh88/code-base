// server.js
const express = require('express');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const { sequelize } = require('./models');

const app = express();

// app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
