import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Job from '../../models/Job.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const updateJobPosition = async (req: Request, res: Response) => {
	const { jobId } = req.params;
	const { listId, pos } = req.body;
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	// Set list IDs of home and target lists, and determine target list length
	const nextListId = listId || job.listId;
	const homeListId = job.listId;
	const listLength = await Job.countDocuments({
		boardId: job.boardId,
		listId: nextListId,
	});

	// Check if "pos" is greater than list length
	if (
		(nextListId === homeListId && pos > listLength - 1) ||
		(nextListId !== homeListId && pos > listLength)
	) {
		throw new BadRequestError('Value of "pos" too large');
	}

	checkPermissions(req.body.user, job.createdBy);

	// Update "pos" field on job
	const updatedJob = await Job.findOneAndUpdate(
		{ _id: jobId },
		{ $set: { pos } },
		{
			new: true,
			runValidators: true,
		}
	);

	// Throw error is updated job doesn't exist
	if (!updatedJob) {
		throw new BadRequestError('Invalid data provided');
	}

	// Reorder new list when job is moved
	if (updatedJob.listId !== homeListId) {
		await Job.updateMany(
			{
				boardId: updatedJob.boardId,
				listId: updatedJob.listId,
				_id: { $ne: updatedJob._id },
				pos: { $gte: updatedJob.pos },
			},
			{ $inc: { pos: 1 } }
		);

		await Job.updateMany(
			{
				boardId: updatedJob.boardId,
				listId: homeListId,
				pos: { $gt: job.pos },
			},
			{ $inc: { pos: -1 } }
		);
	}

	// Set previous and next positions of job
	const prevPosition = job.pos;
	const nextPosition = updatedJob.pos;
	console.log('Prev Position: ', prevPosition);
	console.log('Next Position: ', nextPosition);
	console.log('Prev List: ', homeListId);
	console.log('Next List: ', updatedJob.listId);

	// Reorder jobs within home list
	/*if (updatedJob.listId === homeListId) {
		if (nextPosition > prevPosition) {
			await Job.updateMany(
				{
					boardId: updatedJob.boardId,
					listId: homeListId,
					_id: { $ne: updatedJob._id },
					pos: { $gt: prevPosition, $lte: nextPosition },
				},
				{ $inc: { pos: -1 } }
			);
		}

		if (nextPosition < prevPosition) {
			await Job.updateMany(
				{
					boardId: updatedJob.boardId,
					listId: homeListId,
					_id: { $ne: updatedJob._id },
					pos: { $gte: nextPosition },
				},
				{ $inc: { pos: 1 } }
			);
		}
	}*/

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { job: updatedJob } });
};
