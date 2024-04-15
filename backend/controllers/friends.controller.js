import NotificationTypes from "../../shared/enums/NotificationTypes.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { getSocketId, io } from "../socket/socket.js";
import { createNotification } from "../utils/createNotifiation.js";

export const sendFriendRequest = async (req, res) => { 
    try {
        const { id: friendId } = req.params;
        const userId = req.user.id;

        console.log(friendId);
    
        const frindUser = await User.findById(friendId);
    
        if (!frindUser) 
            return res.status(404).json({ error: 'User not found' });
        if (frindUser.friends.includes(userId)) 
            return res.status(400).json({ error: 'Already friends' });
        if (frindUser.pendingFriendships.includes(userId)) 
            return res.status(400).json({ error: 'Friend request already sent' });
    
        frindUser.pendingFriendships.push(userId);
    
        await frindUser.save();

        // Create Notification 
        createNotification(req.user,frindUser,NotificationTypes.NewFriendRequest);


        // Socket io 
        const receiverSocketId = getSocketId(friendId);
		if(receiverSocketId) {
			io.to(receiverSocketId).emit('newFriendRequest',req.user);
		}

        res.status(200).json({ message: "Your friend request has been sent successfully" });
    } catch (error) {
        console.log("error in sendFriendRequest controller :", error.message);
        res.status(500).json({error: "Internal server error"})
    }
};

export const respondFriendRequest = async (req, res) => {
    try {
        const { id: requestUserId } = req.params;
        const { response } = req.body;
        const user = req.user;

        if (!user) return res.status(404).json({ error: 'User not found' });
        
        if (!user.pendingFriendships.includes(requestUserId)) return res.status(404).json({ error: 'Friend request not found' });

        if(response !== "accept" && response !== "reject") return res.status(400).json({ error: 'Invalid response' });

        user.pendingFriendships = user.pendingFriendships.filter(id => id != requestUserId);

        const requestUser = await User.findById(requestUserId);
        if (response === 'accept') {

            requestUser.friends.push(user.id);
            
            user.friends.push(requestUserId);

            // Create Conversation 
			await Conversation.create({
				participants: [
					{ userId: requestUserId },
					{ userId: user._id } 
				],
			});

            await requestUser.save();
        }
        
        await user.save();
        
        // Create Notification 
        createNotification(user,requestUser,response === 'accept' ? NotificationTypes.FriendRequestAccepted : NotificationTypes.FriendRequestRejected);

        // Socket io 
        const receiverSocketId = getSocketId(requestUserId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('respondToFriendRequest',{user, response});
        }

        return res.json({ message: `Friend request ${response ==="accept" ? "accepted" : "rejected"}` });

    } catch (error) {
        console.log("error in respondFriendRequest controller :", error.message);
        res.status(500).json("Internal server error")
    }
};

export const deleteFriend = async (req,res) => {
    try {
        const { id: friendId } = req.params;
        const user = req.user;

        const friend = await User.findById(friendId);

        if (!friend) return res.status(404).json({ error: 'User not found' });

        if (!user.friends.includes(friendId)) return res.status(404).json({ error: 'This user is not one of your friends' });

        user.friends = user.friends.filter(id => id != friendId);
        friend.friends = friend.friends.filter(id => {
            console.log(id);
            return id != user.id
        })

        await user.save();
        await friend.save();

        createNotification(user,friend,NotificationTypes.RemoveFriendShip);

        // Socket io 
        const receiverSocketId = getSocketId(friendId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('deletedFromFriends',user);
        }

        return res.json({ message: `${friend.fullName} has been removed from your friends list` });

    } catch (error) {
        console.log("error in deleteFriend controller :", error.message);
        res.status(500).json("Internal server error")
    }
}

export const getFriendRequests = async (req, res) => {
    try {
       const userIds = req.user.pendingFriendships;
 
       // Find users whose IDs are in the pendingFriendships array
       const friendRequests = await User.find({ _id: { $in: userIds } });
 
       // Send the friend requests as response
       res.status(200).json(friendRequests);
    } catch (error) {
       console.log("Error in getFriendRequests controller: ", error.message);
       res.status(500).json({ error: "Internal server error" });
    }
}

export const getFriends = async (req,res) => {
    try {
        const userIds = req.user.friends;
  
        // Find users whose IDs are in the friends array
        const friends = await User.find({ _id: { $in: userIds } }).select('-password -__v');

        // Send the friend requests as response
        res.status(200).json(friends);
     } catch (error) {
        console.log("Error in getFriends controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
     }
}