import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../../models/Board.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const getBoard = async (req: Request, res: Response): Promise<void> => {
	const { user } = req.body;
	const { boardId } = req.params;
	const board = await Board.findOne({ _id: boardId });

	if (!board) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, board.createdBy);

	res.status(StatusCodes.OK).json({ board });
};
