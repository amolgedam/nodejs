import { deleteUser, updateUser } from "../services/user.service.js";

export const updateUserController = async(req, res)=>{
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json({
            user,
            message: "Account has been updated successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const deleteUserController = async(req, res)=>{
    try {
        await deleteUser(req.params.id);
        res.status(200).json({
            message: "Account has been deleted successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}