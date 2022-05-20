import express, { Router } from 'express';

import {
	getAllJobs,
	createJob,
	getJob,
	updateJobPosition,
	deleteJob,
} from '../controllers/jobs/index.js';

const router: Router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:jobId').get(getJob).delete(deleteJob);
router.route('/:jobId/position').patch(updateJobPosition);

export default router;
