import mongoose from "mongoose";

const participationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
   
    amount: {
        type: Number,
        required: true
    },
    
    
});

export default mongoose.model('Participation', participationSchema);