import express, { Router } from 'express';

import { createJob } from '../controllers/jobsController.js';

const router: Router = express.Router();

router.route('/').post(createJob);

export default router;
