import express, { Router } from 'express';

import {
	getAllJobs,
	createJob,
	updateJob,
	deleteJob,
} from '../controllers/jobsController.js';

const router: Router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:jobId').patch(updateJob).delete(deleteJob);

export default router;
