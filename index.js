import express from 'express';
import cors from 'cors';
import { connectDb } from './src/config/db.js';
import User from './src/models/user.js';
import userRouter from './src/routes/userRoute.js';
import participationRouter from './src/routes/participationRoute.js';


const app = express();
connectDb();
app.use(express.json())
app.use(cors({
    origin: '*'
}));


const port = 8000;

app.listen(port, ()=>{
    console.log(`App on ${port}`);
    console.log(process.env.JWT_SECRET);
})

app.use('/api/users', userRouter);
app.use('/api/participations', participationRouter);




