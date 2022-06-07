import express, { Router } from 'express';

import {
	createContact,
	getAllContacts,
} from '../controllers/contacts/index.js';

const router: Router = express.Router();

router.route('/').get(getAllContacts).post(createContact);

export default router;
