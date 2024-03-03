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