import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Job from '../../models/Job.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const updateJob = async (req: Request, res: Response): Promise<void> => {
	const { jobId } = req.params;
	const {
		title,
		employer,
		htmlDescription,
		salary,
		postURL,
		location,
		color,
		jobType,
		setting,
	} = req.body.data;
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`);
	}

	checkPermissions(req.body.user, job.createdBy);

	const update = {
		title,
		employer,
		htmlDescription,
		salary,
		postURL,
		location,
		color,
		jobType,
		setting,
	};

	const updatedJob = await Job.findOneAndUpdate(
		{ _id: jobId },
		{ $set: { ...update } },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(StatusCodes.OK).json({ status: 'success', data: { updatedJob } });
};
