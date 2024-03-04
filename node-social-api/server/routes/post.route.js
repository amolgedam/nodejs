import express from 'express';
import { createPostController, updatePostController } from '../controllers/post.controller.js';

const route = express.Router();

route.post('/create', createPostController);

route.put('/update/:id', updatePostController);

export default route;