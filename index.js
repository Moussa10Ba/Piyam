import express from 'express';
import { connectDb } from './src/config/db.js';
import User from './src/models/user.js';
import userRouter from './src/routes/userRoute.js';


const app = express();
connectDb();
app.use(express.json())

const port = 8000;

app.listen(port, ()=>{
    console.log(`App on ${port}`);
})


app.use('/api/users', userRouter);



