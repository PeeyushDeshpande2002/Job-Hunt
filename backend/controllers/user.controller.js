import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {User} from '../models/user.model.js'
import cookie from "cookie-parser";
export const register = async (req, res) => {
  try {
    const { fullname, email, phone, password, role } = req.body;
    console.log(fullname, email, phone, password, role);
    const file = req.file;
    
    
    if (!fullname || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    
    
    if (user) {
      return res.status(400).json({
        message: "User exist with this email",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phone,
      password: hashedpassword,
      role
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please Enter the credentials",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesnt exist with selected role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.Secret_Key, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phone, bio, skills } = req.body;
    console.log(fullname, email, phone, bio, skills );
    
    // if (!fullname || !email || !phone || !bio || !skills) {
    //   return res.status(400).json({
    //     message: "Something is missing",
    //     success: false,
    //   });
    // };
    const file = req.file

    //cloudinary set up afterwards
    let skillsArray;
    if(skills){
      skillsArray = skills.split(",");
  }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not Found",
        success: false,
      });
    }
    //updating Data
   if(fullname) user.fullname = fullname;
    if(email)user.email = email;
   if(phone) user.phone = phone;
    if(bio)user.profile.bio = bio;
    if(skillsArray)user.profile.skills = skillsArray;
    //resume code afterwards 

    const userUpdated = await user.save();
    if(userUpdated)console.log("User updated");
    
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
      };

      return res.status(200).json({
        message : 'Profile updated successfully',
        user,
        success : true
      })
  } catch (error) {
    console.log(error);
  }
};
