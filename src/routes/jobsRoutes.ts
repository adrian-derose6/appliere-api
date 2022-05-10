import express, { Router } from 'express';

import {
	getAllJobs,
	createJob,
	updateJobPosition,
	deleteJob,
} from '../controllers/jobs/index.js';

const router: Router = express.Router();

router.route('/').get(getAllJobs).post(createJob);
router.route('/:jobId').delete(deleteJob);
router.route('/:jobId/position').patch(updateJobPosition);

export default router;
