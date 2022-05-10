import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Job from '../../models/Job.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const getAllJobs = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardId, listId } = req.query;

	if (!boardId) {
		throw new BadRequestError('No board ID provided');
	}

	const query: any = {
		createdBy: req.body.user.userId,
		boardId: boardId as string,
	};

	if (listId) {
		query.listId = listId;
	}

	const jobs = await Job.find(query);
	if (!jobs) {
		throw new NotFoundError('No jobs with provided information');
	}
	const numOfJobs = jobs.length;

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { jobs, numOfJobs } });
};
