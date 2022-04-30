import express, { Router } from 'express';

import {
	getAllJobs,
	createJob,
	deleteJob,
} from '../controllers/jobsController.js';

const router: Router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:jobId').delete(deleteJob);

export default router;
