import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



 export const getAllUsers = async (req, res)=>{

    try {
        const users = await User.find({})
        if(users){
            res.status(200).json({users: users})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
  
}



export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, address , password , role} = req.body;

    
        if (!firstName || !lastName || !email || !phoneNumber || !address || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if the email already exists in the User collection 
        const emailExist = await User.findOne({email});
        if (emailExist) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // Check if the phone number already exists in the User collection
        const phoneNumberExist = await User.findOne({phoneNumber});
        if (phoneNumberExist) {
            return res.status(400).json({ error: "Phone number already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        

        const newUser = new User({ firstName, lastName, email, phoneNumber, address, hashedPassword , role});
    
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(201).json(newUser); // Only one response sent
    } catch (err) {
        res.status(500).json({ error: err.message }); // Only one response sent
    }
}

export const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json("User not found");
        }
        return res.status(200).json({id : id});
    } catch (error) {
        
    }
}

export const updateUser = async (req, res)=>{
    
    try {
        const { firstName, lastName, email, phoneNumber, address , password, role} = req.body;
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set :{
                firstName: firstName, 
                lastName: lastName,
                 email: email,
                 phoneNumber: phoneNumber,
                 address: address,
                 password: password,
                 role: role
                }
            },
            {new: true}
        )
            if(!updatedUser){
                return res.status(404).json({message: 'User Not Found'});
            }
            return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

export const loginUser =  async(req, res)=>{
    try{
        const {email, password} =  req.body;
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Authentication failed"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password );
        if(!passwordMatch){
            return res.status(400).json({error: "Authentication failed"});
        }
        const token = jwt.sign({id:user._id}, 'MySecret123', {expiresIn: '1h'});
        res.status(200).json({token: token, user: user});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
