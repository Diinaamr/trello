

export const isvalid=(schema)=>{

    return(req,res,next)=>{
        const copyreqobj={...req.body,...req.params,...req.query};
        const validationresult= schema.validate(copyreqobj,{abortEarly:false});
        // return res.json({validationresult});
        if(validationresult.error){
        //  return res.json({success:false, error:validationresult.error.details});
     const errorarray= validationresult.error.details.map((element)=>    // here the function map enters in the all object and the object called element so we say that we need the message of the objects and after that we put the variable inside the global error handler
     
    element.message
     );
     return next(new Error (errorarray))
        }
        return next();
    }
    
};    

