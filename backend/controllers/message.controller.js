import Convernsation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let convernsation = await Convernsation.findOne({
      participants: {
        $all: [senderId, receiverId]
      }
    });

    if(!convernsation) {
      convernsation = await Convernsation.create({
        participants: [senderId,receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if(newMessage) {
      convernsation.messages.push(newMessage._id);
    }
    // Socket io functionalty

    await Promise.all(convernsation.save(),newMessage.save());

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller :", error.message);
    res.status(500).json("Internal server error")  
  }
}
export const getMessages = async (req,res) => {
  try {
    const { id:userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Convernsation.findOne({
      participants: {$all: [senderId,userToChatId]},
    }).populate("messages");

    if(!conversation) return res.status(200).json([])
    
    const messages = conversation.messages
    return res.status(200).json(messages);

  } catch (error) {
    console.log("error in getMessages controller :" , error.message);
    res.status(500).json("Internal server error")  
  }
}