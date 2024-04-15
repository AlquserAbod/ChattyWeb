import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverId: req.user._id })
            .populate('senderId')
            .populate('receiverId');

        res.status(200).json(notifications);
    } catch (error) {
        console.log("Error in getNotifications controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const markAsReaded = async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverId: req.user.id });

        await Promise.all(notifications.map(async (notification) => {
            notification.readed = true;
            await notification.save();
        }));

        res.status(200).json({ message: "Notifications marked as read" });
    } catch (error) {
        console.log("Error in markAsReaded controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const clearAll = async  (req, res) => {
    try {
        await Notification.deleteMany({ receiverId: req.user._id });

        res.status(200).json({ message: "Notifications cleared " });
    } catch (error) {
        console.log("Error in clearAll controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}