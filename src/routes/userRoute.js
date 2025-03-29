import express from "express";
import User from "../models/user.js";
import {getAllUsers, createUser, deleteUser, updateUser} from "../controllers/userController.js";


const  userRouter = express.Router();


userRouter.get('/', getAllUsers)

userRouter.post('/', createUser);

userRouter.delete('/:id', deleteUser);

userRouter.put('/:id', updateUser);

export default userRouter;