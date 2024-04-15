import NotificationTypes from "../../shared/enums/NotificationTypes.js";
import Notification from "../models/notification.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const createNotification = async (sender, receiver, type) => {
    try {

        let existingNotification = null;
        
        // If notification type is NewMessage, check for existing unread notification
        if (type === NotificationTypes.NewMessage) {
            existingNotification = await Notification.findOne({
                senderId: sender.id,
                receiverId: receiver.id,
                type: NotificationTypes.NewMessage,
                readed: false
            })


            await notification.populate('senderId');
            await notification.populate('receiverId');
        }

        // If an existing unread notification was found, return it


        const message = type == NotificationTypes.NewFriendRequest ?  `A new friend request from ${sender.fullName}` : 
            type == NotificationTypes.FriendRequestAccepted ? `${sender.fullName}'s friend request has been accepted`  :
            type == NotificationTypes.FriendRequestRejected ? `${sender.fullName}'s friend request was rejected` :
            type == NotificationTypes.RemoveFriendShip ? `${sender.fullName} removed your friendship with him` :
            type == NotificationTypes.NewMessage && `New message from ${sender.fullName}` ;

        // Create new notification

        let notification; 
        if (existingNotification) {
            notification = existingNotification;
        }else {
            notification = new Notification({
                senderId: sender.id,
                receiverId: receiver.id,
                type,
                message
            })
            
            await notification.populate('senderId');
            await notification.populate('receiverId');
            
            await notification.save();
        }

        const receiverSocketId = getSocketId(receiver.id);
		if(receiverSocketId) {
			io.to(receiverSocketId).emit('newNotification',notification);
		}

        
        // Return the newly created notification
        return notification;
    } catch (error) {
        // Return the error
        console.error("Error creating notification:", error);
        return { error: "Internal server error" };
    }
};