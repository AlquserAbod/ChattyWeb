import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { deleteFriend, getFriendRequests, getFriends, respondFriendRequest, sendFriendRequest } from "../controllers/friends.controller.js";

const router = express.Router();

router.get('/',protectRoute,getFriends);


router.get('/requests',protectRoute,getFriendRequests);

router.post('/send-request/:id',protectRoute,sendFriendRequest);

router.post('/respond-request/:id',protectRoute,respondFriendRequest);

router.delete('/delete-friend/:id',protectRoute,deleteFriend);

export default router