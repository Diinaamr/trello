
import { Schema , model} from "mongoose";
const userschema= new Schema ({
name:String,
email:{
type:String,
unique:true,
},
isConfirmed:{
type:Boolean,
default:false

},
password:String,
phone:Number,
gender:{
type:String,
enum:['male','female'],


},
age:Number,
isDeleted:{
    type:Boolean,
    default:false
},
isOnlie:{
    type:Boolean,
    default:false
},
isConfirmed:{
    type:Boolean,
    default:false
},
isloggedin:{
    type:Boolean,
    default:false
},
forgetCode:String,


},{timestamps:true});
 export const User =model('User',userschema);