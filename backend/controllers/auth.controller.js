import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import Notification from '../models/notification.model.js';

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender} = req.body;
    
    if(password !== confirmPassword) {
      return res.status(400).json({error: "Passwords don't match"});
    }

    const user = await User.findOne({username});
    
    if(user){
      return res.status(400).json({error: "username already exists"});
    }

    // HASH PASSWORD HERE

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


    const newUser =  new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic
    });

    
    if(newUser) {
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();

      const { password: userPassword,__v, ...returnUserObject } = newUser.toObject();

      res.status(200).json(returnUserObject);
    }else {
      return res.status(400).json({error: "Inalide user data"});
    }

  }catch(error) {
    console.log("error in signup controller :", error.message);
    res.status(500).json("Internal server error")
  }
}

export const login = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Inalide username or password"});
    }
    
    generateTokenAndSetCookie(user._id,res);

    const { password: userPassword,__v, ...returnUserObject } = user.toObject();

    res.status(200).json(returnUserObject);


  } catch (error) {
    console.log("error in login controller :", error.message);
    return res.status(400).json({error: "Invalide user data"});
  }
}

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const changePassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({error: "Passwords don't match"});
    }

    // Find the user by ID
    const user = await User.findById(req.user.id); 

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    // Update the user's password

    user.password = hashedPassword;
    await user.save();

    // Return success response
    return res.status(200).json({ message: "Password changed successfully" });    
  } catch (error) {
    console.log("Error in changePassword controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
}

export const updateProfile = async (req,res) => {
  try {
    const { username,fullName,gender } = req.body;
    
    // Find the user by ID
    const user = await User.findById(req.user.id); 

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the username is already in use
    if (username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "username already exists" });
      }
    }

    // Update user profile fields
    user.username = username;
    user.fullName = fullName;
    
    // Update avatar and gender based on gender change
    if (gender !== user.gender) {
      user.gender = gender;
      user.profilePic = `https://avatar.iran.liara.run/public/${gender == "male" ? "boy" : "girl"}?username=${username}`;
    }

    // Save the updated user
    await user.save();

    
    // Return success response
    const { password: userPassword,__v, ...returnUserObject } = user.toObject();

    res.status(200).json(returnUserObject);

  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteAccount = async (req,res) => {
  try {
    const user = req.user;

    // Delete all messages
    await Message.deleteMany({
      $or: [{ senderId: user._id }, { receiverId: user._id }]
    });

    
    await Conversation.deleteMany({ "participants.userId": user._id });

    await User.findByIdAndDelete(user._id);

    // Delete all notifications where the user is either sender or receiver
    await Notification.deleteMany({
      $or: [{ senderId: user._id }, { receiverId: user._id }]
    });

    // logout from account 
    res.cookie("jwt", "", { maxAge: 0 });

    return res.status(200).json("The account has been deleted successfully");
  } catch (error) {
    console.log("Error in deleteAccount controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
}