import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

import Board from '../models/Board.js';
import List from '../models/List.js';
import Job from '../models/Job.js';

import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';

export const getLists = async (req: Request, res: Response): Promise<void> => {
	const { userId } = req.body.user;
	const { boardId } = req.params;
	const lists = await Board.findOne({ _id: boardId }).select(
		'lists id createdBy'
	);

	let matchBoardId = new mongoose.Types.ObjectId(boardId);
	let matchUserId = new mongoose.Types.ObjectId(userId);

	const aggrLists = await Board.aggregate([
		{
			$match: { _id: matchBoardId, createdBy: matchUserId },
		},
		{ $unwind: '$lists' },
		{
			$lookup: {
				from: Job.collection.name,
				let: {
					listId: '$lists._id',
				},
				pipeline: [
					{ $match: { $expr: { $eq: ['$listId', '$$listId'] } } },
					{ $sort: { pos: 1 } },
					{ $set: { id: '$_id' } },
					{ $unset: '_id' },
					{ $unset: '__v' },
				],
				as: 'jobs',
			},
		},
		{
			$addFields: { 'lists.jobs': '$jobs', 'lists.id': '$lists._id' },
		},
		{ $unset: 'lists._id' },
		{
			$group: {
				_id: '$_id',
				lists: { $push: '$lists' },
			},
		},
		{ $set: { id: '$_id' } },
		{ $unset: '_id' },
	]);

	if (!lists) {
		throw new NotFoundError(`No board with id: ${boardId}`);
	}

	checkPermissions(req.body.user, lists.createdBy);

	res.status(StatusCodes.OK).json({ status: 'success', data: aggrLists });
};

export const updateLists = async (
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
