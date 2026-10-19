import {Router} from "express";
import * as ls from "./log.service.js";
import { respond } from "../../common/respond.js";

export let logRouter = Router(); 
logRouter.post("/",async(req,res)=>{
    let data = req.body;
    let result = await ls.insertOne(data);
    respond(res,result,201,"log added") 
})



