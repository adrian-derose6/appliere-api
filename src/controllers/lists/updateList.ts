import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../../models/Board.js';
import List from '../../models/List.js';
import Job from '../../models/Job.js';

import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const updateList = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { user, lists } = req.body;
	const { boardId } = req.params;
	const board = await Board.findOne({ _id: boardId });

	if (!board) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	if (lists.length !== board.lists.length) {
		throw new BadRequestError('Invalid request');
	}

	checkPermissions(req.body.user, board.createdBy);
	const updatedLists = await Board.findOneAndUpdate(
		{ _id: boardId },
		{ $set: { lists } },
		{
			new: true,
			runValidators: true,
		}
	).select('lists id createdBy');

	res.status(StatusCodes.OK).json({ status: 'success', data: updatedLists });
};
