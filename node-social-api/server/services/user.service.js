import bcrypt from 'bcrypt';

import UserModel from '../models/user.model.js';

export const updateUser = async(userId, updateData)=>{
    if(updateData.password){
        try {
            const SALT = 10;
            updateData.password = await bcrypt.hashSync(updateData.password, SALT);
        } catch (err) {
            throw err;
        }
    }

    try {
        const user = await UserModel.findByIdAndUpdate(userId, {
            $set: updateData,
        }, {
            new: true
        });

        return user;
    } catch (err) {
        throw err;
    }
}

export const deleteUser = async(userId)=>{
    try {
        await UserModel.findByIdAndDelete(userId);
    } catch (err) {
        throw err;
    }
}

export const getUser = async(userId)=>{
    try {
        const user = await UserModel.findById(userId);
        return user;
    } catch (err) {
        throw err;
    }
}

export const followUser = async(userdata, updatedData)=>{
    if(userdata.userId === updatedData.id){
        throw new Error('You can\'t follow yourself');
    }
    else {
        try {
            const user = await UserModel.findById(userdata.userId);
            const currentUser = await UserModel.findById(updatedData.id);
    
            if(!user.followers.includes(userdata.userId)){
                await user.updateOne({
                    $push: {followers: updatedData.id}
                });
    
                await currentUser.updateOne({
                    $push: {followers: userdata.userId}
                });
    
                return {user, currentUser}
            }
            else{
                throw new Error("You have already followed this user");
            }
        } catch (err) {
            throw err;
        }
    }
}

export const unfollowUser = async(userdata, updatedData)=>{
    if(userdata.userId === updatedData.id){
        throw new Error('You can\'t unfollow yourself');   
    }
    else {
        try {
            const user = await UserModel.findById(userdata.userId);
            const currentUser = await UserModel.findById(updatedData.id);
    
            if(!user.followers.includes(userdata.userId)){
                await user.updateOne({
                    $pull: {followers: updatedData.id}
                }, {new: true});
    
                await currentUser.updateOne({
                    $pull: {followers: userdata.userId}
                }, {new: true});
    
                return {user, currentUser}
            }
            else{
                throw new Error("You don't followed this user");
            }
        } catch (err) {
            throw err;
        }
    }
}