import express from 'express';
import { createPostController, deletePostController, updatePostController } from '../controllers/post.controller.js';

const route = express.Router();

route.post('/create', createPostController);

route.put('/update/:id', updatePostController);

route.delete('/delete/:id', deletePostController);

export default route;