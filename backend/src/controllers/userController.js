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
        await sendVerificationEmail(email, userName, verificationLink);

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

// Verify-Email
exports.verifyEmail=async(req, res, next)=>{
    try{
        const {token}=req.query;

        if(!token){
            return res.status(400).json({
                status:400,
                message:"Verification token is missing!"
            })
        }

        const user=await User.findOne({verificationToken:token, verificationTokenExpiry: { $gt: new Date() }});

        if (!user) {
            return res.status(400).json({
                status:400,
                message: 'Invalid or expired token.',
            });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;
        await user.save();

        return res.status(200).json({
            status:200,
            message:"Email verified successfully!"
        })
    }catch(error){
        console.log("Verify Email Error:=>", error);
        return res.status(500).json({
            status:500,
            message:"Internal Server Error!"
        })
    }
}

// Signin
exports.signin=async(req, res, next)=>{
    try{
        const {email, password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                status:400,
                message:"Please provide email and password."
            })
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({
                status:401,
                message:"Invalid Email!"
            })
        }

        const isPasswordMatch=await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                status:401,
                message:"Invalid Credentials!"
            })
        }

        if(!user.isVerified){
            return res.status(403).json({
                status:403,
                message:"Please verify your email before logging in."
            })
        }

        const payload={
            user:{
                id:user._id,
                email:user.email
            }
        }

        const accessToken=jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

        return res.status(200).json({
            status:200,
            message:"Sign in Successful!",
            token: accessToken,
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
            },
        })
    }catch(error){
        console.log("Sign in Error:=>", error);
        return res.status(500).json({
            status:500,
            message:"Internal Server Error!"
        })
    }
}