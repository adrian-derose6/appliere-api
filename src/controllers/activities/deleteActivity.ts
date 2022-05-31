import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Activity from '../../models/Activity.js';
import { NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const deleteActivity = async (req: Request, res: Response) => {
	const { activityId } = req.params;
	const activity = await Activity.findOne({ _id: activityId });

	if (!activity) {
		throw new NotFoundError(`No activity with id: ${activityId}`);
	}

	checkPermissions(req.body.user, activity.createdBy);
	await activity.remove();

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', message: 'Activity successfully deleted' });
};
