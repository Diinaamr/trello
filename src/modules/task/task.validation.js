import joi from 'joi';

export const addtaskschema= joi.object({
title:joi.string().min(3).max(45).required(),
descreption:joi.string().min(3).max(50).required(),
deadline:joi.date().greater('now'),
assignto:joi.string(),






}).required().unknown(true);

export const updatetaskschema= joi.object({
title:joi.string().min(3).max(45).required(),
descreption:joi.string().min(3).max(50).required(),
deadline:joi.date(),
assignto:joi.string().required(),
status:joi.string(),
// id:joi.string().required(),




}).required().unknown(true)