import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../../models/Board.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const deleteBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardId } = req.params;
	const board = await Board.findOne({ _id: boardId });

	if (!board) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, board.createdBy);
	await board.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
};
