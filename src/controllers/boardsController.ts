import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

export const snippet = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

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
	const { boardName } = req.body;
	console.log(boardName);
	if (!boardName) {
		throw new BadRequestError('Please name board');
	}

	req.body.createdBy = req.body.user.userId;
	const board = await Board.create(req.body);

	res.status(StatusCodes.CREATED).json({ board });
};

export const deleteBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};
