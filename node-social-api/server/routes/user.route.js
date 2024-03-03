import express from 'express';
import { updateUserController } from '../controllers/user.controller.js';

const router = express.Router();

/* Update User */
router.put('/:id', updateUserController)

/* Delete User */

/* Get User */

router.get('/', (req, res)=>{
    res.send('These are test route');
})

export default router;