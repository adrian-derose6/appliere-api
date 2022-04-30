import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import Job from '../models/Job.js';
import {
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
} from '../errors/index.js';

export const snippet = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
	const { title, employer, boardId, listId } = req.body.data;

	if (!title || !employer || !boardId || !listId) {
		throw new BadRequestError('Please provide all required values');
	}

	const createdBy = req.body.user.userId;
	const job = await Job.create({ title, employer, boardId, listId, createdBy });

	res.status(StatusCodes.CREATED).json({ status: 'success', data: job });
};
