import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: { type: String, required: true},
  readed: { type: Boolean, default: false},
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification",notificationSchema);

export default Notification;