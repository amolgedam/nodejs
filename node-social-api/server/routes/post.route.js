import express from 'express';
import { createPostController } from '../controllers/post.controller.js';

const route = express.Router();

route.post('/create', createPostController);

export default route;