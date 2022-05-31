import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Job from '../../models/Job.js';
import { NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const deleteJob = async (req: Request, res: Response) => {
	const { jobId } = req.params;
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id: ${jobId}`);
	}

	const boardId = job.boardId;
	const listId = job.listId;
	const deletedPos = job.pos;

	checkPermissions(req.body.user, job.createdBy);
	await job.remove();

	// Decrement all existing jobs' positions with pos > job.pos
	await Job.updateMany(
		{ boardId, listId, pos: { $gt: deletedPos } },
		{ $inc: { pos: -1 } }
	);

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', message: 'Job successfully deleted' });
};
