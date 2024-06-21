

// this asyncHandler function is resonsible to simplify the error handling by catching any error that may occur in the controller function. this helps to save time by not handling common error each time in each controller.If not then it will reutrn a promise returned by the asynchronous function.

export const asyncHandler = (requestHandler)=>{
     return (req,res,next)=>{
          Promise.resolve(requestHandler(req,res,next)).catch(next)
     }
}