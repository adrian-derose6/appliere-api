import express, { Router } from 'express';

import {
	createContact,
	getAllContacts,
	getContact,
	updateContact,
} from '../controllers/contacts/index.js';

const router: Router = express.Router();

router.route('/').get(getAllContacts).post(createContact);
router.route('/:contactId').get(getContact).patch(updateContact);

export default router;
