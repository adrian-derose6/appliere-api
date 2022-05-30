import express, { Router } from 'express';

import {
	getAllActivities,
	createActivity,
} from '../controllers/activities/index.js';

const router: Router = express.Router();

router.route('/').get(getAllActivities).post(createActivity);

export default router;
