require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');
const ApiResponse = require('./middlewares/ApiResponse');

const app = express();
app.use(bodyParser.json());

app.use(cors())

app.use('/api', taskRoutes);

// Route not found handler
app.use((req, res, next) => {
    res.status(404).send(new ApiResponse(404, false, 'Route not found'));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
