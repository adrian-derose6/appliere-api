import express, { Router } from 'express';

import {
	getAllActivities,
	createActivity,
	deleteActivity,
	updateActivity,
} from '../controllers/activities/index.js';

const router: Router = express.Router();

router.route('/').get(getAllActivities).post(createActivity);
router.route('/:activityId').patch(updateActivity).delete(deleteActivity);

export default router;
