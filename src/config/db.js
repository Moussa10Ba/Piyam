import mongoose from "mongoose";

const  mongooseUri = 'mongodb://localhost:27017/piyame';

//const mongooseUri = "mongodb+srv://moussa10ba:Passer%40123@killeuhcode.bgjrf.mongodb.net/?retryWrites=true&w=majority&appName=KilleuHCode"

export const connectDb = async (req, res)=>{
        
    try {
        const conn =  await mongoose.connect(mongooseUri);
        if(conn){
            console.log(`Connected host ${conn.connection.host}`)
        }
    } catch (error) {
        res.error();
        console.log(error);
    }
}