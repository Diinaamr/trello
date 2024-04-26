export const catcherror = (controller) => {
    return (req, res, next) => {
      controller(req, res, next).catch((error) => {
  
        next(error);
        //here instead of writing 
        // res.json({succes:false,message:error.message}) ;
        // //so we replace it by next(error) so this will trigger the global error handler that we wrote in app.router.js
  
  
      });
  
  
    };
  
  
  
  
  };