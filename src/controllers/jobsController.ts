import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import Job from '../models/Job.js';
import {
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

export const snippet = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

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
		pos: 0,
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

export const deleteJob = async (req: Request, res: Response) => {
	const { jobId } = req.params;
	console.log(jobId);
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

export const updateJob = async (req: Request, res: Response) => {
	const { jobId } = req.params;
	const { data } = req.body;
	const { listId, pos } = data;
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	checkPermissions(req.body.user, job.createdBy);

	const updatedJob = await Job.findOneAndUpdate(
		{ _id: jobId },
		{ $set: { ...data } },
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedJob) {
		throw new BadRequestError('Invalid data provided');
	}

	const boardId = updatedJob.boardId;
	const prevPosition = job.pos;
	const nextPosition = updatedJob.pos;

	if (nextPosition && nextPosition > prevPosition) {
		await Job.updateMany(
			{
				boardId,
				listId,
				_id: { $ne: updatedJob._id },
				pos: { $gt: prevPosition, $lt: nextPosition },
			},
			{ $inc: { pos: -1 } }
		);

		await Job.updateMany(
			{
				boardId,
				listId,
				_id: { $ne: updatedJob._id },
				pos: { $gte: nextPosition },
			},
			{ $inc: { pos: 1 } }
		);
	}

	if (nextPosition && nextPosition < prevPosition) {
		await Job.updateMany(
			{
				boardId,
				listId,
				_id: { $ne: updatedJob._id },
				pos: { $gte: nextPosition },
			},
			{ $inc: { pos: 1 } }
		);
	}

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { job: updatedJob } });
};
