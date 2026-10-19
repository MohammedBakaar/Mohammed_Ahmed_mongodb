
export const respond = (res  , data , status =200,message = "Done" )=>{
res.status(status).json({
    status,
    data ,
    message
});
}