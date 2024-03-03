import express from 'express';
import { deleteUserController, getUserController, updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

/* Update User */
router.put('/:id', updateUserController);

/* Delete User */
router.delete('/:id', deleteUserController);

/* Get User */
router.get('/:id', getUserController);

export default router;