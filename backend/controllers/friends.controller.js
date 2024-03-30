import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => { 
    try {
        const { id: friendId } = req.params;
        const userId = req.user.id;
    
        const frindUser = await User.findById(friendId);
    
        if (!frindUser) 
            return res.status(404).json({ error: 'User not found' });
        if (frindUser.friends.includes(userId)) 
            return res.status(400).json({ error: 'Already friends' });
        if (frindUser.pendingFriendships.includes(userId)) 
            return res.status(400).json({ error: 'Friend request already sent' });
    
        frindUser.pendingFriendships.push(userId);
    
        await frindUser.save();

        res.status(200).json({ message: "Your friend request has been sent successfully" });
    } catch (error) {
        console.log("error in sendFriendRequest controller :", error.message);
        res.status(500).json("Internal server error")
    }
};

export const respondFriendRequest = async (req, res) => {
    try {
      const { id: requestUserId } = req.params;
      const { response } = req.body;
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: 'User not found' });
      
      if (!user.pendingFriendships.includes(requestUserId)) return res.status(404).json({ error: 'Friend request not found' });

      if(response !== "accept" && response !== "reject") res.status(400).json({ error: 'Invalid response' });

      user.pendingFriendships = user.pendingFriendships.filter(id => id != requestUserId);

      if (response === 'accept') user.friends.push(requestUserId);
      
      await user.save();

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

        await user.save();

        return res.json({ message: `${friend.fullName} has been removed from your friends list` });

    } catch (error) {
        console.log("error in deleteFriend controller :", error.message);
        res.status(500).json("Internal server error")
    }
}