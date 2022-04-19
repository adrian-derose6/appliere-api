import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './db/connect-db.js';

dotenv.config();

const app: Express = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});
console.log('server running');

const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL as string;

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
