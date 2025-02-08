const express = require('express');
const foodRoutes = require('./routes/foodRoutes');
const { port } = require('./config/serverConfig');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

const app = express();

const PORT = 5000 || process.env.PORT;

app.use('/api', foodRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
