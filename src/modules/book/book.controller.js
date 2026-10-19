import {Router} from "express";
import * as bs from "./book.service.js";
import { respond } from "../../common/respond.js";

export let bookRouter = Router(); 

bookRouter.post("/",async (req,res)=>{
    let data = req.body
    let  result =  await bs.insertOne(data);
    respond(res,result,201,"Book added")

})
bookRouter.post("/batch",async (req,res)=>{
    let data = req.body
    let  result =  await bs.insertMany(data);
    respond(res,result,201,"Books added")

})
bookRouter.patch("/future",async (req,res)=>{
    let  result =  await bs.updateFuture();
    respond(res,result,200,"Book updated")
})
bookRouter.get("/title/",async (req,res)=>{
    let data = req.query.title
    let  result =  await bs.findOne(data);
    if(!result)
    {
        throw new Error("Book not found",{cause:404})
    }
    respond(res,result,200,"Book fetched")

})

bookRouter.get("/year",async (req,res)=>{
   
      let   from = Number( req.query.from) 
       let to = Number(req.query.to)
        
    let  result =  await bs.findByDate(from,to);
    if(!result)
    {
        throw new Error(`NO books published between ${from} and ${to}`,{cause:404})
    }
    respond(res,result,200,"Books fetched")

})