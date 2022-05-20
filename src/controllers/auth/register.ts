import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../../models/User.js';
import { BadRequestError } from '../../errors/index.js';

export const register = async (req: Request, res: Response): Promise<void> => {
	const { firstName, lastName, email, password } = req.body;
	if (!firstName || !email || !password) {
		throw new BadRequestError('Please provide all values');
	}

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError('Email is already in use');
	}

	const user = await User.create({ firstName, lastName, email, password });
	const accessToken = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user,
		accessToken,
		message: 'User successfully created',
	});
};
