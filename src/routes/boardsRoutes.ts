import express, { Router } from 'express';

import {
	createBoard,
	getAllBoards,
	updateBoard,
	deleteBoard,
	getBoard,
} from '../controllers/boards/index.js';
import { getLists, updateLists } from '../controllers/lists/index.js';

const router: Router = express.Router();

router.route('/').get(getAllBoards).post(createBoard);
router.route('/:boardId').get(getBoard).delete(deleteBoard).patch(updateBoard);
router.route('/:boardId/lists').get(getLists).patch(updateLists);

export default router;
