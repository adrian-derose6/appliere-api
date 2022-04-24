import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { UnauthenticatedError } from '../errors/index.js';

const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET as string);
		console.log(payload);
		req.body.user = { userId: '6264685349952596cc6c3329' };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
};

export default authenticateUser;
