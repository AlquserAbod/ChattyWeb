import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import { getConversation, getConversations, markMessagesAsReaded } from "../controllers/conversation.controller.js";

const router = express.Router();


router.get('/',protectRoute, getConversations);
router.get('/:id',protectRoute, getConversation);
router.put('/read/:id', protectRoute, markMessagesAsReaded); 


export default router