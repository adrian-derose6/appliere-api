import express, { Router } from 'express';

import { createBoard, getBoards } from '../controllers/boardsController.js';

const router: Router = express.Router();

router.route('/').get(getBoards).post(createBoard);

export default router;
