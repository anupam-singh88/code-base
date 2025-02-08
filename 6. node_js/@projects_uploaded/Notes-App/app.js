import express from 'express';
import morgan from 'morgan';
import { customDirName } from './utils/dirname.js';
import notFountMiddleware from './middleware/not-found.middleware.js'
import globalErrorHandler from './middleware/error-handler.middleware.js'

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(`${customDirName}/public`));
app.use(morgan('dev'));


//all routes
import userRoutes from './routes/User.routes.js';
import notesRoutes from './routes/Notes.routes.js'

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/notes', notesRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to Notes API"
    })
});

app.use(notFountMiddleware)
app.use(globalErrorHandler);



export default app;