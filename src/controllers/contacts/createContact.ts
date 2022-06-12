import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Contact from '../../models/Contact.js';
import { BadRequestError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const createContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	const {
		firstName,
		lastName,
		jobTitle,
		companies,
		location,
		emails,
		phones,
		jobs,
		boardId,
	} = req.body;
	const { userId } = req.body.user;

	if (!firstName || !lastName) {
		throw new BadRequestError('Missing required values: firstName or lastName');
	}

	let createObj = {
		firstName,
		lastName,
		jobTitle,
		companies,
		location,
		emails,
		phones,
		jobs,
		boardId,
		createdBy: userId,
	};
	// Create contact document
	const contact = await Contact.create(createObj);

	res
		.status(StatusCodes.CREATED)
		.json({ status: 'success', data: { contact } });
};
