import  Router  from "express";
import { deletetask, getTasksOfOneManger, getMyTask, gettask, todotask, updateTask ,getTasksWithinDeadline} from "./task.controller.js";
import {isauthenticated} from '../../middelware/auth.js';
import{addtaskschema, updatetaskschema} from '../../../src/modules/task/task.validation.js';
import{isvalid} from'../../middelware/validation.middelware.js'

const router =Router();

router.post ('/',isvalid(addtaskschema),isauthenticated,todotask);
router.patch('/:taskId',isvalid(updatetaskschema),isauthenticated,updateTask);
router.delete('/:taskId',isauthenticated,deletetask);
router.get('/',gettask);
router.get('/one',isauthenticated,getTasksOfOneManger)
router.get("/oneuser",isauthenticated,getMyTask);
router.get('/getTasksWithinDeadline',getTasksWithinDeadline);


export default router ;