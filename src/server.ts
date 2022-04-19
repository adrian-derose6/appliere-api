import 'express-async-errors';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './db/connect-db';

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

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL!);

		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
