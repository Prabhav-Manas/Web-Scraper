const User=require('../models/users');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const {sendVerificationEmail}=require('../utils/mailer');

// Signup
exports.createUser=async(req,res,next)=>{
    try{
        const{userName, email, password}=req.body;

        if(!userName || !email || !password){
            return res.status(400).json({
                status:400,
                message:"Please provide username, email and password."
            })
        }

        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                status:409,
                message:"User already exists!"
            })
        }

        const hashPassword=await bcrypt.hash(password, 12);

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const user=await User.create({
            userName,
            email,
            password:hashPassword,
            verificationToken,
            verificationTokenExpiry
        })

        // Send Email Verification Link
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        await sendVerificationEmail(email, username, verificationLink);

        return res.status(201).json({
            status:201,
            message:"Registration successful. Please check your email to verify your account."
        })
    }catch(error){
        console.log('Registration Error:=>', error);
        return res.status(500).json({
            status:500,
            message:"Internal Server Error!"
        })
    }
}