import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

export const getAllBoards = async (
	req: Request,
	res: Response
): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

export const createBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardName } = req;

	if (!boardName) {
		throw BadRequestError('Please name board');
	}

	req.body.createdBy = req.body.user.userId;
	const board = await Board.create(req.body);

	res.status(StatusCodes.OK).json({ board });
};

export const deleteBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};
