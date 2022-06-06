import express, { Router } from 'express';

import { createContact } from '../controllers/contacts/index.js';

const router: Router = express.Router();

router.route('/').post(createContact);

export default router;
