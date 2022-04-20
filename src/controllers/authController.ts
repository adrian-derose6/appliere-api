import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

export const register = async (req: Request, res: Response): Promise<void> => {
	const { fullName, email, password } = req.body;

	if (!fullName || !email || !password) {
		throw new BadRequestError('Please provide all values');
	}
	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError('Email is already in use');
	}
	const user = await User.create({ fullName, email, password });
	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user: {
			fullName: user.fullName,
			email: user.email,
			location: user.location,
		},
	});
};

export const login = async (req: Request, res: Response): Promise<void> => {
	console.log('regiser user');
};

export const updateUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	console.log('regiser user');
};
