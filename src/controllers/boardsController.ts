import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import {
	BadRequestError,
	UnauthenticatedError,
	NotFoundError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

export const snippet = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

export const getAllBoards = async (
	req: Request,
	res: Response
): Promise<void> => {
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
	const {
		user: { userId },
	} = req.body;

	if (!boardName) {
		throw new BadRequestError('Please name board');
	}

	const board = await Board.create({ createdBy: userId, boardName });
	res.status(StatusCodes.CREATED).json({ board });
};

export const updateBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id: boardId } = req.params;
	const { boardName } = req.body;

	if (!boardName) {
		throw new BadRequestError('Please provide all values');
	}

	const board = await Board.findOne({ _id: boardId });

	if (!board) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, board.createdBy);

	if (boardName) {
		board.boardName = boardName;
		await board.save();
	}

	res.status(StatusCodes.OK).json({ board });
	/* const updatedBoard = await Board.findOneAndUpdate(
		{ _id: boardId },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);*/
};

export const deleteBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id: boardId } = req.params;
	const board = await Board.findOne({ _id: boardId });

	if (!board) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, board.createdBy);
	await board.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
};
