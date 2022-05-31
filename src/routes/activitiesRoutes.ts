import express, { Router } from 'express';

import {
	getAllActivities,
	createActivity,
	deleteActivity,
} from '../controllers/activities/index.js';

const router: Router = express.Router();

router.route('/').get(getAllActivities).post(createActivity);
router.route('/:activityId').delete(deleteActivity);

export default router;
