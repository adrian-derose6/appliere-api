// Import external dependencies
import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// Import DB connect
import connectDB from './db/connect-db.js';

// Import routes
import authRouter from './routes/authRoutes.js';
import boardsRouter from './routes/boardsRoutes.js';

// Import custom middleware
import errorHandler from './middleware/errorHandler.js';
import authenticateUser from './middleware/authenticateUser.js';
import notFound from './middleware/notFound.js';

dotenv.config();

// Initialize app
const app: Express = express();

// Inject external middleware
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(cors());

// API Routes
app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/boards', authenticateUser, boardsRouter);

// Inject custom middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL as string;

// Start server
const start = async () => {
	try {
		await connectDB(mongoUrl);

		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
