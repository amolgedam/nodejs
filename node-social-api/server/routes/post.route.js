import express from 'express';
import { createPostController, deletePostController, getPostController, getTimelinePostsController, likeAndDislikePostController, updatePostController } from '../controllers/post.controller.js';

const route = express.Router();

route.post('/create', createPostController);

route.put('/update/:id', updatePostController);

route.delete('/delete/:id', deletePostController);

route.put('/like/:id', likeAndDislikePostController);

route.get('/:id', getPostController);

route.get('/timeline-posts', getTimelinePostsController);

export default route;