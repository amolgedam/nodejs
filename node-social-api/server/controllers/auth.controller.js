
import UserModel from "../models/user.model.js";
import { loginUser, registerUser } from "../services/auth.service.js";

/* Register */
export const register = async(req, res) => {
    try {
        const newUser = await registerUser(req.body);

        const {password, ...data} = newUser._doc;
        res.status(200).json({
            data,
            message: "User has been registered successfully!",
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Error occured on Registering user"
        });
        console.log(error);
    }
}

/* Login */
export const login = async(req, res)=>{
    try {
        const loggedUser = await loginUser(req.body);
        const {password, ...data} = loggedUser._doc;

        res.status(200).json({
            message: "User logged in successfully!",
            data
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Error occured on Login user"
        });
        console.log(error);
    }
}
