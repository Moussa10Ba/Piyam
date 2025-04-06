import Participation from "../models/participation.js";
import User from "../models/user.js";


export const getAllParticipations = async (req, res) => {
    try {
        const participations = await Participation.find({})
        if (participations) {
            res.status(200).json({ participations: participations });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export const createParticipation = async (req, res) => {
    try {
        const { userId, status , amount, year, month} = req.body;
        if (!userId || !status, !amount) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const newParticipation = new Participation({ userId, status, amount, year, month });
        // Check if the userId exists in the User collection
        
        await newParticipation.save();
        res.status(201).json(newParticipation); // Only one response sent
    } catch (err) {
        res.status(500).json({ error: err.message }); // Only one response sent
    }
}

export const deleteParticipation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedParticipation = await Participation.findByIdAndDelete(id);
        if (!deletedParticipation) {
            return res.status(404).json("Participation not found");
        }
        return res.status(200).json({ id: id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateParticipation = async (req, res) => {
    try {
        const { userId, status , amount} = req.body;
        const { id } = req.params;
        const updatedParticipation = await Participation.findByIdAndUpdate(
            id,
            {
                $set: {
                    userId: userId,
                    status: status,
                    amount: amount
                }
            },
            { new: true }
        );
        if (!updatedParticipation) {
            return res.status(404).json("Participation not found");
        }
        return res.status(200).json(updatedParticipation);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}