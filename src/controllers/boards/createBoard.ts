import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Board from '../../models/Board.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';
import getBoardIconColor from '../../utils/getBoardIconColor.js';

export const createBoard = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name, user, archived } = req.body;

	if (!name) {
		throw new BadRequestError('Please name board');
	}

	const icon = { color: getBoardIconColor() };
	const board = await Board.create({
		createdBy: user.userId,
		name,
		archived,
		icon,
	});

	res.status(StatusCodes.CREATED).json({ board });
};
