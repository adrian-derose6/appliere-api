import express, { Router } from 'express';

import { createJob, deleteJob } from '../controllers/jobsController.js';

const router: Router = express.Router();

router.route('/').post(createJob);
router.route('/:jobId').delete(deleteJob);

export default router;
