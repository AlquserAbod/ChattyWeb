import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    unreadCount: {
      type: Number,
      default: 0
    }
  }],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: []
    }
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
    default: null
  }
},{timestamps: true});

const Conversation = mongoose.model("Conversation",conversationSchema);

export default Conversation;