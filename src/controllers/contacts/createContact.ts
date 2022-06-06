import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Activity from '../../models/Activity.js';
import { BadRequestError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const createActivity = async (
	req: Request,
	res: Response
): Promise<void> => {
	const {
		firstName,
		lastName,
		jobTitle,
		companies,
		location,
		emails,
		phones,
		jobs,
		boardId,
	} = req.body;
	const { userId } = req.body.user;

	if (!firstName || !lastName) {
		throw new BadRequestError('Missing required values');
	}

	let createObj = {};
	// Create activity
	const activity = await Activity.create(createObj);

	res
		.status(StatusCodes.CREATED)
		.json({ status: 'success', data: { activity } });
};
