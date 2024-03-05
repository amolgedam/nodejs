import { createPost, deletePost, getPost, getTimelinePosts, likeAndDislikePost, updatePost } from "../services/post.service.js";

export const createPostController =async(req, res)=>{
    try {
        const newPost = await createPost(req.body);
        res.status(200).json({
            newPost,
            message: "Post has been created successfully"
        });
    } catch (error) {
        console.log(err);
        res.status(500).json({
            err,
            message: "Post creation failed"
        });
    }
}

export const updatePostController =async(req, res)=>{
    try {
        const updatedPost = await updatePost(req.params, req.body);
        res.status(200).json({
            updatedPost,
            message: "Post has been updated successfully"
        });

    } catch (error) {
        console.log(err);
        res.status(500).json({
            err,
            message: "Post updation failed"
        });
    }
}

export const deletePostController =async(req, res)=>{
    try {
        const updatedPost = await deletePost(req.params, req.body);
        res.status(200).json({
            updatedPost,
            message: "Post has been deleted successfully"
        });

    } catch (error) {
        console.log(err);
        res.status(500).json({
            err,
            message: "Post deletion failed"
        });
    }
}

export const likeAndDislikePostController =async(req, res)=>{
    try {
        const post = await likeAndDislikePost(req.params, req.body);
        res.status(200).json({
            post,
            message: "Post like and dislike action has been completed"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Post like and dislike action failed"
        });
    }
}

export const getPostController =async(req, res)=>{
    try {
        const post = await getPost(req.params);
        res.status(200).json({
            post,
            message: "Post details"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Post detail failed"
        });
    }
}

export const getTimelinePostsController =async(req, res)=>{
    try {
        const timelinePosts = await getTimelinePosts(req.body);
        res.status(200).json({
            timelinePosts,
            message: "Timeline Post fetched successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error,
            message: "Post fetch failed"
        });
    }
}