import express, { Router } from 'express';

import { register, login, updateUser } from '../controllers/authController.js';

const router: Router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);

export default router;
