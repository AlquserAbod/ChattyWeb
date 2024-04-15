import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: conversationId } = req.params;
  
		let conversation = await Conversation.findById(conversationId).populate({ path: 'participants.userId' });

		if (!conversation) return res.status(404).json({ error: "the conversation is not found" });

		const receiverParticipant = conversation.participants.find((user) => user.userId.id != req.user.id);

		if (!receiverParticipant) { return res.status(403).json({ error: "You are not a participant in this conversation" }) }

		const reciversocketId = getSocketId(receiverParticipant.userId.id);
		
		const unreadCount = reciversocketId ? 0 : 1;

		if(unreadCount > 0 ) receiverParticipant.unreadCount += 1;
  
		// Create the new message
		const newMessage = new Message({
			senderId: req.user._id,
		 	receiverId: receiverParticipant.userId,
			message,
		});
	
		conversation.messages.push(newMessage._id);
		
		conversation.latestMessage = newMessage;
		
		
		await Promise.all([conversation.save(), newMessage.save()]);
		
		conversation = await conversation.populate('messages');

		await newMessage.populate('senderId')
		if (reciversocketId) {
			io.to(reciversocketId).emit('newMessage', {conversation ,newMessage});
		}

		res.status(201).json({conversation, newMessage});
	} catch (error) {
	  console.log("Error in sendMessage controller: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: conversationId } = req.params;
		const userId = req.user._id;

		const conversation = await Conversation.findByIdAndUpdate(conversationId).populate('messages');

		if (!conversation) return res.status(404).json({ error: "the conversation is not found" });

		const currentUserParticipant =  conversation.participants.find((user) => user.userId.toString() == req.user.id);
		
		if (currentUserParticipant) {
		  currentUserParticipant.unreadCount = 0;
		  await conversation.save(); 
		}
	
    	const messages = await Message.find({ _id: { $in: conversation.messages } }).populate('senderId');

		res.status(200).json(messages);
	} catch (error) {
	  console.log("Error in getMessages controller: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
};



export const getUnReadedMessageCount = async (req, res) => {
	try {	  
		const userId = req.user.id;
		const conversationId = req.params.id;

		const conversation = await Conversation.findByIdAndUpdate(conversationId);


		if (!conversation) return res.status(404).json({ error: "the conversation is not found" });
  
	  const currentUserParticipant = conversation.participants.find(participant => participant.userId.equals(userId));
    
	  res.status(200).json(currentUserParticipant.unreadCount);
	} catch (error) {
	  console.log("Error in getUnReadedMessageCount controller: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
}

export const increaseUnReadedMessage = async (req,res) => {
	try {	  
		
		const conversationId = req.params.id

		const conversation = await Conversation.findByIdAndUpdate(conversationId, { new: true })
			.populate({ path: 'participants.userId' })
			.populate('messages')
			.populate('latestMessage');

	 	if (!conversation) { return res.status(404).json({ error: "the conversation is not found" });}

		const receiverUserParticipant = conversation.participants.find((user) => {
			return user.userId.id == req.user.id
		});
		
		  
	  	if (!receiverUserParticipant) { return res.status(403).json({ error: "You are not a participant in this conversation" }) }
  
	  	receiverUserParticipant.unreadCount++;

		await conversation.save();
  
	  	res.status(200).json(conversation);
	} catch (error) {
	  console.log("Error in increaseUnReadedMessage controller: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
}