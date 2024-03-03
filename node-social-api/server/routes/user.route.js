import express from 'express';
import { deleteUserController, updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

/* Update User */
router.put('/:id', updateUserController);

/* Delete User */
router.delete('/:id', deleteUserController);

/* Get User */

router.get('/', (req, res)=>{
    res.send('These are test route');
})

export default router;