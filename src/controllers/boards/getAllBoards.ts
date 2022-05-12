import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../../models/Board.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const getAllBoards = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { user } = req.body;
	const { archived } = req.query;

	let queryObject = {
		archived: archived || false,
		createdBy: user.userId,
	};

	const boards = await Board.find(queryObject);
	const numOfBoards = boards.length;

	res.status(StatusCodes.OK).json({ boards, numOfBoards });
};
