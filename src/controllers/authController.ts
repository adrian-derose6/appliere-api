import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User, { UserDocument } from '../models/User.js';
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
	const accessToken = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user: {
			fullName: user.fullName,
			email: user.email,
			location: user.location,
		},
		accessToken,
		message: 'User successfully created',
	});
};

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide all values');
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const accessToken = user.createJWT();
	const userRes = { ...user._doc, password: undefined };

	res.status(StatusCodes.OK).json({ user: userRes, accessToken });
};

export const updateUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	console.log('regiser user');
};
