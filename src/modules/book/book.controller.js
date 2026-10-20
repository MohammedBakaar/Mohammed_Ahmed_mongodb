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
bookRouter.get("/genre" , async(req,res)=>{
        let data = req.query.genre
        
        let result = await bs.findByGenre(data);

        respond(res,result ,result.length ? 200:404 ,`Books ${result.length ? `fetched` : `not found`} `)
})
bookRouter.get("/skip-limit" , async(req,res)=>{
        let result = await bs.getWithLimit();
        respond(res,result ,result.length ? 200:404 ,`Books ${result.length ? `fetched` : `not found`} `)
})
bookRouter.get("/year-int" , async(req,res)=>{
        let result = await bs.getIntYear();
        respond(res,result ,result.length ? 200:404 ,`Books ${result.length ? `fetched` : `not found`} `)
})
bookRouter.get("/exclude-genres" , async(req,res)=>{
        let result = await bs.getExcludeGenres();
        respond(res,result ,result.length ? 200:404 ,`Books ${result.length ? `fetched` : `not found`} `)
})
bookRouter.delete("/year" , async(req,res)=>{
    let data = req.query.year;
      let result =    await bs.deleteBefore(data);
        respond(res,result,200 ,"ok")
})
bookRouter.get("/aggregate1" , async(req,res)=>{
        let result = await bs.aggregate1();
        respond(res,result ,result.length ? 200:404 ,`Books ${result.length ? `fetched` : `not found`} `)
})