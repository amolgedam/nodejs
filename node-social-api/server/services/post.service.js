
import PostModel from '../models/post.model.js';

export const createPost =async(body)=>{
    try {
        const newPost = new PostModel(body);
        await newPost.save();
        return newPost;
    } catch (error) {
        throw error;
    }
}