import express from "express";

import { getMessages, getUnReadedMessageCount, increaseUnReadedMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.get('/:id',protectRoute, getMessages);
router.post('/send/:id',protectRoute, sendMessage);
router.get('/unreadCount/:id',protectRoute, getUnReadedMessageCount);
router.put('/increaseUnreadCount/:id',protectRoute, increaseUnReadedMessage);

export default router