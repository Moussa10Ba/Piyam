import express from "express";
import User from "../models/user.js";
import {getAllUsers, createUser, deleteUser, updateUser, loginUser} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const  userRouter = express.Router();


userRouter.get('/', authMiddleware, getAllUsers)

userRouter.post('/', createUser);

userRouter.post('/login', loginUser)

userRouter.delete('/:id', deleteUser);

userRouter.put('/:id', updateUser);


export default userRouter;