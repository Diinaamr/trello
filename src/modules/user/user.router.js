import Router  from "express";
import { Signup,Login, updateuser,deletuser, softdelete, logout,changepass,confirmEmail,resetPassword,forgetPassword} from "./user.controller.js";
import { isvalid } from "../../middelware/validation.middelware.js";
import { Signupschema, changepassSchema, loginSchema, updateschema, forgetCodeSchema,forgetPasswordSchema } from "./user.validation.js";
import {isauthenticated } from '../../middelware/auth.js'
const router=Router();
router.post('/',isvalid(Signupschema),Signup);
router.post('/Log',isvalid(loginSchema),Login);
router.patch('/',isauthenticated,isvalid(changepassSchema),changepass);
router.patch("/update",isvalid(updateschema),isauthenticated,updateuser)
router.delete("/",isauthenticated,deletuser);
router.patch('/softdel',isauthenticated,softdelete);
router.patch ('/logout',isauthenticated,logout);
router.get('/:token',confirmEmail);
// send forgetPasswordCode
router.patch('/code',isvalid( forgetCodeSchema),resetPassword)
//forgetpassword
router.patch("/forgetPassword",isvalid(forgetPasswordSchema),forgetPassword)

export default router;