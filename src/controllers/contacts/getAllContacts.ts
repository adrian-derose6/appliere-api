import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Contact from '../../models/Contact.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const getAllContacts = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { boardId, jobId } = req.query;
	const { user } = req.body;

	const query = {
		createdBy: user?.userId,
	};

	const contacts = await Contact.find(query);

	if (!contacts) {
		throw new NotFoundError('No contacts matched request');
	}
	const numOfContacts = contacts.length;
	if (numOfContacts > 0) {
		checkPermissions(user, contacts[0].createdBy);
	}

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { contacts, numOfContacts } });
};
