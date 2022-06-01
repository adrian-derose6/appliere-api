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
		boardId,
		jobId,
		title,
		activityCategory,
		startAt,
		endAt,
		note,
		completed,
	} = req.body;
	const { userId } = req.body.user;

	if (!title || !activityCategory || !startAt || !boardId || !jobId) {
		throw new BadRequestError('Missing required values');
	}

	let createObj = {
		title,
		note,
		activityCategory,
		startAt,
		endAt,
		completed,
		boardId,
		job: jobId,
		createdBy: userId,
	};
	// Create activity
	const activity = await Activity.create(createObj);

	res
		.status(StatusCodes.CREATED)
		.json({ status: 'success', data: { activity } });
};
