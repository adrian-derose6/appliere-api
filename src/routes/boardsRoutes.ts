import express, { Router } from 'express';

import {
	createBoard,
	getBoards,
	updateBoard,
	deleteBoard,
	getBoard,
} from '../controllers/boardsController.js';
import { getLists, updateLists } from '../controllers/listsController.js';

const router: Router = express.Router();

router.route('/').get(getBoards).post(createBoard);
router.route('/:boardId').get(getBoard).delete(deleteBoard).patch(updateBoard);
router.route('/:boardId/lists').get(getLists).patch(updateLists);

export default router;
