import {catcherror}from '../../utilis/catcherror.js'
import {User} from '../../../DB/models/user.model.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '../../utilis/sendemails.js';
import randomstring from 'randomstring';
import { codeTemp } from '../../utilis/html.js';


export const Signup = catcherror( async (req,res,next)=>{
const {name,email,password,confirmPassword,phone,gender,age}=req.body;
const hashPassword = bcryptjs.hashSync(password,parseInt(process.env.SALT_ROUNDS)) ;
const results = await User.create({name,email,password:hashPassword,gender,phone,age});
// sendEmail
const token = jwt.sign({email},process.env.TOKENKEY)
  const isSuccess=await sendEmail({to:email,subject:"confirmEmail",html:`<a href=" http://localhost:5000/USERS/${token}">please click here to confirm your account </a>`});
if(!isSuccess){
    return next(new Error("email is invalid"))
}
return res.json({success:true,message:"user added succefully",results});
});



// --------------------
//confirmEmail
export const confirmEmail=catcherror(async(req,res,next)=>{
    const {token}=req.params;
    const payload=jwt.verify(token,process.env.TOKENKEY);
    const {email}=payload;
    const user = await User.findOneAndUpdate({email},{isConfirmed:true},{new:true});
return res.json({success:true,results:user});

})










export const Login =catcherror( async(req,res,next)=>{
const {email,password}=req.body;
const results= await User.findOne({email});
if(!results ){
    return next (new Error ('email is invaild'));
}

const match = bcryptjs.compareSync(password,results.password);
if (!match){
// return res.json({success:false , message:"invalid password!"});
return next (new Error('invalid password'));
}
const user = await results.updateOne({isOnlie:true,isDeleted:false})

const token = jwt.sign({
    email,
    id: results._id,
    
},process.env.TOKENKEY);


return res.json({success:true,message:"done",token});


});

////////////////
// ------------------------

export const changepass= catcherror(async(req,res,next)=>{
const {password,newpassword}=req.body;
const email= req.users.email;
console.log(email);
const results = await User.findOne({email});

const matchPass= bcryptjs.compareSync(password,results.password);
if(!matchPass){
    return res.json({success:false,message:"invalid password"});
}
const hassNewPass = bcryptjs.hashSync(newpassword,parseInt(process.env.SALT_ROUNDS)) ;
const updatepass= await results.updateOne({password:hassNewPass });
return res.json({success:true,message:"updated succefully",updatepass});

});
// ---------------------

export const updateuser=catcherror(async(req,res,next)=>{
const {name,age,newname,newage}=req.body
const id =req.users._id;
const user = await User.findByIdAndUpdate(id,{name,age});
if(!user){
    return res.json({success:false,message:"invalid user"});

}
const results = await user.updateOne({name:newname , age:newage})
return res.json({success:true,message:"updated succefully",results})
});












// ---------------
export const deletuser= catcherror(async(req,res,next)=>{
const email=req.users.email;
const user = await User.findOneAndDelete({email});
return res.json({success:true,message:"user deleted succefully!"});

});
// ---------------------
//soft delete
export const softdelete= catcherror(async(req,res,next)=>{
const email=req.users.email;
const user = await User.findOneAndUpdate({email},{isDeleted:true,isOnlie:false});
return res.json({success:true,message:"user deleted succefully!"});

});
///////////
// logout
export const logout= catcherror(async(req,res,next)=>{
    const email=req.users.email;
    const user = await User.findOneAndUpdate({email},{isOnlie:false});
    return res.json({success:true,message:"user is offline!"});
    
    });


    //////////////////////
// send forgetPassword code
export const resetPassword=catcherror(async(req,res,next)=>{
const user= await User.findOne({email:req.body.email});
if(!user){
    return next(new Error("user is not found"))
}
const code= randomstring.generate({
    length:6,
    charset:"numeric"
})
user.forgetCode=code;
await user.save();
// send email
const results= await sendEmail({to:req.body.email,subject:"confimation code",html:codeTemp(code)})
return res.json({sucess:true,message:"please enter your email"})
})

// forgetpassword
export const forgetPassword=catcherror(async(req,res,next)=>{
let user = await User.findOne({forgetCode:req.body.forgetCode})
if(!user) return next(new Error("invalid code"))
const update= await user.updateOne({$unset:{forgetCode:1}})
user.password=bcryptjs.hashSync(req.body.password,parseInt(process.env.SALT_ROUNDS))
user.save();
return res.json({success:true,message:'you password changed'})

});