
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

export const updatePost=async(params, body)=>{
    try {
        const updatedPost = await PostModel.findById(params.id);
        if(updatedPost.userId === body.userId){
            await updatedPost.updateOne({
                $set: body,
            }, {
                new: true
            });

            return updatedPost;
        }
        else{
            throw new Error('You can update only your post');
        }
    } catch (error) {
        throw error
    }
}

export const deletePost=async(params, body)=>{
    try {
        const deletedPost = await PostModel.findById(params.id);
        if(deletedPost.userId === body.userId){
            await PostModel.deleteOne();
            return deletedPost;
        }
        else{
            throw new Error('You can delete only your post');
        }
    } catch (error) {
        throw error
    }
}

export const likeAndDislikePost=async(params, body)=>{
    try {
        const post = await PostModel.findById(params.id);

        if(!post.likes.includes(body.userId)){
            /* Like */
            await post.updateOne({
                $push: {likes: body.userId}
            });
        }
        else{
            /* Dislike */
            await post.updateOne({
                $pull: {likes: body.userId}
            });
        }
        return post;
    } catch (error) {
        throw error
    }
}