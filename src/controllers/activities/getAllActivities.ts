import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Activity from '../../models/Activity.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const getAllActivities = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardId } = req.query;
	const { user } = req.body;

	if (!boardId) {
		throw new BadRequestError('No board ID provided');
	}

	const query = {
		createdBy: user.userId,
		boardId: boardId as string,
	};

	const activities = await Activity.find(query)
		.sort({ endAt: 'asc' })
		.populate('job');
	if (!activities) {
		throw new NotFoundError('No activities matched request');
	}
	const numOfActivities = activities.length;
	if (numOfActivities > 0) {
		checkPermissions(user, activities[0].createdBy);
	}

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { activities, numOfActivities } });
};
