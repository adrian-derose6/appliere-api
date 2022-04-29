import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../models/Board.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import getRandomColor from '../utils/getRandomColor.js';

import { Types } from 'mongoose';

export const snippet = async (req: Request, res: Response): Promise<void> => {
	res.status(StatusCodes.OK).json({});
};

export const getBoards = async (req: Request, res: Response): Promise<void> => {
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

export const createBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name, user, archived } = req.body;

	if (!name) {
		throw new BadRequestError('Please name board');
	}

	const icon = { color: getRandomColor() };
	const board = await Board.create({
		createdBy: user.userId,
		name,
		archived,
		icon,
	});

	res.status(StatusCodes.CREATED).json({ board });
};

export const updateBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardId } = req.params;
	const board = await Board.findOne({ _id: boardId });

	if (!board) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, board.createdBy);
	const updatedBoard = await Board.findOneAndUpdate(
		{ _id: boardId },
		{ $set: { ...req.body } },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(StatusCodes.OK).json({ updatedBoard });
};

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

export const getBoardLists = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { user } = req.body;
	const { boardId } = req.params;
	const lists = await Board.findOne({ _id: boardId }).select(
		'lists id createdBy'
	);

	if (!lists) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, lists.createdBy);

	res.status(StatusCodes.OK).json({ status: 'success', data: lists });
};

export const updateBoardLists = async (
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
