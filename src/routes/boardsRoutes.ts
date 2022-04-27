import express, { Router } from 'express';

import {
	createBoard,
	getBoards,
	updateBoard,
	deleteBoard,
	getBoardLists,
} from '../controllers/boardsController.js';

const router: Router = express.Router();

router.route('/').get(getBoards).post(createBoard);
router.route('/:id').delete(deleteBoard).patch(updateBoard);
router.route('/:id/lists').get(getBoardLists);

export default router;
