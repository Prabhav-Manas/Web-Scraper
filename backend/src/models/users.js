const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{type:String, required:[true, 'Username is required'], trim:true, minlength:[2, 'Username must be at least 3 characters']},
    email:{type:String, required:[true, 'Email is required'], unique:true, trim:true, lowercase:true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']},
    password:{type:String, required:[true, 'Password is required'], minlength: [6, 'Password must be at least 6 characters']},
    isVerified:{type:Boolean, default:false},
    verificationToken:{type:String, default:null},
    verificationTokenExpiry:{type:Date, default:null},
    bookmarks:[{type:mongoose.Schema.Types.ObjectId, ref:'Story'}]  
}, { timestamps: true });

module.exports=mongoose.model('User', userSchema);