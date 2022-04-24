import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { UnauthenticatedError } from '../errors/index.js';

interface JwtPayload {
	userId: string;
}
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
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		req.body.user = { userId: payload.userId };
		next();
	} catch (error) {
		throw new UnauthenticatedError('Authentication Invalid');
	}
};

export default authenticateUser;
