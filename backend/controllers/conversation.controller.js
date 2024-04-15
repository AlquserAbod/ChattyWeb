import Conversation from "../models/conversation.model.js";


export const getConversations =  async (req,res) => {
    try {
        const userId = req.user._id;

        const conversations = await Conversation.find({
            "participants": { $elemMatch: { userId: userId } }
        })
        .populate('messages')
        .populate({ path: 'participants.userId' })
        .populate('latestMessage')

        return res.status(200).json(conversations);
    } catch (error) {
        console.log("error in getConversations controller :", error.message);
        res.status(500).json("Internal server error")
    }


}

export const getConversation =  async (req,res) => {
    try {
        const conversationId = req.params.id;
        

        const conversation = await Conversation.findById(conversationId)
            .populate({ path: 'participants.userId' })
            .populate('messages')
            .populate('latestMessage')

		if (!conversation) return res.status(404).json({ error: "the conversation is not found" });
    
        return res.status(200).json(conversation);
    } catch (error) {
        console.log("error in getConversation controller :", error.message);
        res.status(500).json("Internal server error")
    }

}

export const markMessagesAsReaded = async (req, res) => {
	try {	  
        const conversationId = req.params.id;

        const conversation = await Conversation.findById(conversationId)
            .populate({ path: 'participants.userId' })
            .populate('messages')
            .populate('latestMessage')

		if (!conversation)  return res.status(404).json({ error: "the conversation is not found" });
        
        const currentUserParticipant = conversation.participants.find(participant => participant.userId.equals(req.user._id));
        
		if (!currentUserParticipant) return res.status(403).json({ error: "You are not a participant in this conversation" });
  
	  	currentUserParticipant.unreadCount = 0;
  
	  	await conversation.save();
  
	  	res.status(200).json(conversation);
	} catch (error) {
	  console.log("Error in markMessagesAsReaded controller: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
};
