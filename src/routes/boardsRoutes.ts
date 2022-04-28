import express, { Router } from 'express';

import {
	createBoard,
	getBoards,
	updateBoard,
	deleteBoard,
	getBoard,
} from '../controllers/boardsController.js';

const router: Router = express.Router();

router.route('/').get(getBoards).post(createBoard);
router.route('/:boardId').get(getBoard).delete(deleteBoard).patch(updateBoard);

export default router;
