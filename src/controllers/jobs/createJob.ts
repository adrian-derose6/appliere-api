import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Job from '../../models/Job.js';
import { BadRequestError } from '../../errors/index.js';
import getJobColor from '../../utils/getJobColor.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const createJob = async (req: Request, res: Response): Promise<void> => {
	const { title, employer, boardId, listId } = req.body.data;
	const { userId } = req.body.user;

	if (!title || !employer || !boardId || !listId) {
		throw new BadRequestError('Missing required values');
	}

	let createObj = {
		title,
		employer,
		boardId,
		listId,
		color: getJobColor(),
		createdBy: userId,
	};
	// Create job
	const job = await Job.create(createObj);

	// Increment all existing jobs' positions
	await Job.updateMany(
		{ boardId, listId, _id: { $ne: job._id } },
		{ $inc: { pos: 1 } }
	);

	res.status(StatusCodes.CREATED).json({ status: 'success', data: { job } });
};
