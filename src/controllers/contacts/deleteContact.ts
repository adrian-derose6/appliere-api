import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Contact from '../../models/Contact.js';
import { NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const deleteContact = async (req: Request, res: Response) => {
	const { contactId } = req.params;
	const contact = await Contact.findOne({ _id: contactId });

	if (!contact) {
		throw new NotFoundError(`No contact with id: ${contactId}`);
	}

	checkPermissions(req.body.user, contact.createdBy);
	await contact.remove();

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', message: 'Contact successfully deleted' });
};
