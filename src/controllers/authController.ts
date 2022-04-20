import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import User from '../models/User';

export const register = async (req: Request, res: Response): Promise<void> => {
	const { fullName, email, password } = req.body;

	if (!fullName || !email || !password) {
	}
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
