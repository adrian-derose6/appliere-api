import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

export const snippet = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

export const getBoards = async (req: Request, res: Response): Promise<void> => {
	const {
		user: { userId },
	} = req.body;

	const queryObject = {
		createdBy: userId,
	};
	const boards = await Board.find(queryObject);

	res.status(StatusCodes.OK).json({ boards });
};

export const createBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardName } = req.body;

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
