import {User} from '../../../DB/models/user.model.js'
import {Task} from '../../../DB/models/task.model.js'
import {catcherror} from '../../utilis/catcherror.js'
export const todotask =catcherror(async(req,res,next)=>{
// const adminId = req.users._id;

const {title,descreption,assignto,deadline}=req.body;
const user= await User.findById(assignto)
console.log(user);
if(!user){
    return next (new Error('this user you want to assign task not exist') )
}
const task = await Task.create({title,descreption,status:'todo',assignto,deadline,adminId:req.users._id});
return res.json({success:true,message:"task added succefully",task});


});
// ---------------------
//updatetask


export const updateTask = async(req,res,next) =>{
    const { title, descreption,status, assignto } = req.body;
            const { taskId } =req.params
    const adminId = req.users._id
    console.log({ title,descreption ,status, assignto});
    const task = await Task.findById(taskId)
        if (!task) {
            return next( new Error('Task not found'));
        }
        if (task.adminId.toString() !== adminId.toString()) {
            return next(new Error('You are not authorized to update this task'));
        }
        const user =await User.findById(assignto)
        if(user){
            const results= await task.updateOne({title,descreption,status, assignto},{new:true});
            return res.status(200).json({ message: 'Task updated successfully', results}); 
        }
            return next( new Error('this user you want to assign task not exist'));

        
}
//-------------------------

//deletetask

export const deletetask=catcherror(async(req,res,next)=>{
const adminId=req.users._id;
const {taskId}=req.params;
const task= await Task.findByIdAndDelete(taskId);
if(!task){
    return next(new Error ('invalid task'));
}
console.log(taskId);
console.log(adminId);
if(task.adminId.toString()!==adminId.toString()){
    return next(new Error ('you are not allowed to delete it'));
}
return res.json({success:true,message:"deleted succefully!"});
});
//----------------------
//get all atsks with users data

export const gettask=catcherror(async(req,res,next)=>{
const task = await Task.find().populate([{
path: "adminId assignto",
select:'email name phone'

}])
return res.json({success:true,task});
});


//----------------------
//get tasks of one user
export const getTasksOfOneManger =catcherror(async(req,res,next)=>{
const task = await Task.find({adminId:req.users._id}).populate([{
    path:'adminId',
    select:'email name phone gender'
}]);
return res.json({success:true,task});
});


//---------------
//get task of one user without login
export const getMyTask =catcherror(async(req,res,next)=>{
    const task = await Task.find({assignto:req.users._id}).populate([{
        path:'assignto',
        select:'email name phone gender'
    }]); 
    return res.json({success:true,task}); 
    });

//-------------------
export const getTasksWithinDeadline =catcherror(async(req,res,next)=>{
    const currentDate =  Date.now();

    const tasks = await Task.find(
        {
        status: 'done' ,
        deadline: { $lt: currentDate }
      }).populate(
        'assignto', 'name email'
        );
        return res.json({success:true,tasks}); 


});