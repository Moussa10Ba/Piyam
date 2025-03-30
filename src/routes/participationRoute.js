import {getAllParticipations, createParticipation, deleteParticipation, updateParticipation} from '../controllers/participationController.js';

import express from "express";
const router = express.Router();
// Define the routes for participation
router.get('/', getAllParticipations);
router.post('/', createParticipation);
router.delete('/:id', deleteParticipation);
router.put('/:id', updateParticipation);
export default router;
        