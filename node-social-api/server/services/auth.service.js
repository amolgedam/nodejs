import bcrypt from 'bcrypt';

import UserModel from '../models/user.model.js';

export const registerUser = async(body) => {
    const SALT = 10;
    const hashPassword = bcrypt.hashSync(body.password, SALT);
    const newUser = new UserModel({
        username: body.username,
        email: body.email,
        password: hashPassword,
    });

    await newUser.save();
    return newUser;
}

export const loginUser = async(body)=>{
    const user = await UserModel.findOne({
        email: body.email
    });
    !user && res.status(404).json("User not found!");

    const passwordCheck = await bcrypt.compare(body.password, user.password);
    !passwordCheck && res.status(404).json("Wrong Password!");

    return user;
}
