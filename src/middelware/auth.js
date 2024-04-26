import jwt from 'jsonwebtoken';
import {User} from '../../DB/models/user.model.js';
import{catcherror}from '../utilis/catcherror.js';
 export const isauthenticated = catcherror(async(req,res,next)=>{
    let {token}=req.headers;
    if(!token){
return res.status(400).json({success:false,message:"invalid token"});

    }
if(!token.startsWith(process.env.BEARERKEY)){
    return res.status(401).json({success:false,message:"invalid token"});
}
token=token.split(process.env.BEARERKEY)[1];
const payload= jwt.verify(token,process.env.TOKENKEY);
const users = await User.findById(payload.id).select("-password");
// console.log(payload.id);
if(!users){
    return res.json({success:false,message:"user not found!!!!!!"})
}
req.users=users;
return next();
});