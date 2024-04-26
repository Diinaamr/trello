import userRouter from'./user/user.router.js'
import taskRouter from'../../src/modules/task/task.router.js'
export const approuter =(app,express)=>{
app.use(express.json());
app.use('/USERS',userRouter);
app.use('/TASKS',taskRouter)
app.use((error,req,res,next)=>{

return res.json({success:false,message:error.message,stack:error.stack})

});
app.all('*',(req,res,next)=>{
return res.json({message:"invalid page"});

});
};