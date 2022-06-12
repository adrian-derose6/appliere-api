import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Contact from '../../models/Contact.js';
import { BadRequestError, NotFoundError } from '../../errors/index.js';
import checkPermissions from '../../utils/checkPermissions.js';

export const updateContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { contactId } = req.params;
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
	const contact = await Contact.findOne({ _id: contactId });

	if (!contact) {
		throw new NotFoundError(`No contact with id: ${contactId}`);
	}

	checkPermissions(req.body.user, contact.createdBy);

	const updateContactDTO = {
		firstName,
		lastName,
		jobTitle,
		companies,
		location,
		emails,
		phones,
		jobs,
		boardId,
	};

	const updatedContact = await Contact.findOneAndUpdate(
		{ _id: contactId },
		{ $set: updateContactDTO },
		{
			new: true,
			runValidators: true,
		}
	);

	res
		.status(StatusCodes.OK)
		.json({ status: 'success', data: { updatedContact } });
};
