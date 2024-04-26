import joi from 'joi';
import { Types } from "mongoose"

const validateObjectId = ( value , helper) =>{
   return Types.ObjectId.isValid(value) ? true : helper.message('In-Valid object-Id from validation')
}
 export const Signupschema=joi.object({
    name:joi.string().min(3).max(15).required(),
email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
confirmPassword:joi.string().valid(joi.ref('password')).required(),
gender:joi.string(),
phone:joi.number().required(),
age:joi.number(),
 }).required()


 export const loginSchema=joi.object({
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:joi.string().required(),

 }).required()

export const updateschema= joi.object({
   newname:joi.string().min(3).max(15).required(),
   newage:joi.number(),
}).required()



export const changepassSchema=joi.object({
   password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
   newpassword:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).required()


export const forgetCodeSchema=joi.object({
   email:joi.string().email().required(),
}).required()


export const forgetPasswordSchema=joi.object({
   email:joi.string().email().required(),
   password:joi.string().required(),
   confirmPassword:joi.string().valid(joi.ref('password')).required(),
   forgetCode:joi.string().required(),
}).required()