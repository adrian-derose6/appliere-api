import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../../errors/index.js';

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
		throw new UnauthenticatedError('Invalid password');
	}

	const accessToken = user.createJWT();
	const userRes = { ...user._doc, password: undefined };

	res.status(StatusCodes.OK).json({ user: userRes, accessToken });
};
