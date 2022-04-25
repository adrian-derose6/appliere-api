import express, { Router } from 'express';

import {
	createBoard,
	getAllBoards,
	updateBoard,
	deleteBoard,
} from '../controllers/boardsController.js';

const router: Router = express.Router();

router.route('/').get(getAllBoards).post(createBoard);
router.route('/:id').patch(updateBoard).delete(deleteBoard);

export default router;
