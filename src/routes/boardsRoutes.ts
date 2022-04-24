import express, { Router } from 'express';

import { createBoard } from '../controllers/boardsController.js';

const router: Router = express.Router();

router.route('/').post(createBoard);

export default router;
