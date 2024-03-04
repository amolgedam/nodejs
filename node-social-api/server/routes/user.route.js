import express from 'express';
import { deleteUserController, followUserController, getUserController, unfollowUserController, updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

/* Update User */
router.put('/:id', updateUserController);

/* Delete User */
router.delete('/:id', deleteUserController);

/* Get User */
router.get('/:id', getUserController);

/* Follow a user */
router.put('/follow/:id', followUserController);

/* Unfollow a user */
router.put('/unfollow/:id', unfollowUserController);


export default router;