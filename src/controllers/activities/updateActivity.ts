import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Activity from '../../models/Activity.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const updateActivity = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { activityId } = req.params;
	const {
		title,
		note,
		completed,
		completedAt,
		startAt,
		endAt,
		activityCategory,
		jobId,
	} = req.body;
	const activity = await Activity.findOne({ _id: activityId });

	if (!activity) {
		throw new NotFoundError(`No activity with id: ${activityId}`);
	}

	checkPermissions(req.body.user, activity.createdBy);

	const update = {
		title,
		note,
		completed,
		completedAt,
		startAt,
		endAt,
		activityCategory,
		job: jobId,
	};

	const updatedActivity = await Activity.findOneAndUpdate(
		{ _id: activityId },
		{ $set: { ...update } },
		{
			new: true,
			runValidators: true,
		}
	);

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { updatedActivity } });
};
