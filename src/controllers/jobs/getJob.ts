import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Job from '../../models/Job.js';
import { NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const getJob = async (req: Request, res: Response) => {
	const { jobId } = req.params;
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`);
	}

	checkPermissions(req.body.user, job.createdBy);

	res.status(StatusCodes.OK).json({ status: 'success', data: { job } });
};
