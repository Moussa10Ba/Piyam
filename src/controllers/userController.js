import User from "../models/user.js";



 export const getAllUsers = async (req, res)=>{

    try {
        const users = await User.find({})
        if(users){
            res.status(200).json({users: users})
        }
    } catch (error) {
        res.status(500).json({message: 'Inre'})
    }
  
}

export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, address } = req.body;
        if (!firstName || !lastName || !email || !phoneNumber || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newUser = new User({ firstName, lastName, email, phoneNumber, address });
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
        const { firstName, lastName, email, phoneNumber, address } = req.body;
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set :{
                firstName: firstName, 
                lastName: lastName,
                 email: email,
                 phoneNumber: phoneNumber,
                 address: address
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