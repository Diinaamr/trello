
import { Schema , Types, model} from "mongoose";
const taskschema= new Schema ({
title :String,
descreption : String,
status :{
type :String,
enum:['todo','doing','done'],
default:"todo",


},
adminId:{
    type :Types.ObjectId,
    ref:"User",
    required:true
    
},


assignto:{
    type :Types.ObjectId,
    ref:"User",
    required:true


},
deadline : Date,
},{timestamps:true});
 export const Task =model('Task',taskschema);