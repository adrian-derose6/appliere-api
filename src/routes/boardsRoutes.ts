import express, { Router } from 'express';

import {
	createBoard,
	getBoards,
	updateBoard,
	deleteBoard,
} from '../controllers/boardsController.js';

const router: Router = express.Router();

router.route('/').get(getBoards).post(createBoard);
router.route('/:id').patch(updateBoard).delete(deleteBoard);

export default router;
