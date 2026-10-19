import { Router } from "express";
import { respond } from "../../common/respond.js";
import * as cs from "./create.service.js"

export let createRouter = Router()

createRouter.post("/books",async (req,res)=>{
    let result = await cs.createTable("books");
    respond(res,result ? {ok : 1} : null,201,"collection created");
})
createRouter.post("/books/index",async (req,res)=>{
    let result = await cs.createIndex("title");
    respond(res,result,201,"index created");
})

createRouter.post("/authors",async (req,res)=>{
    let result = await cs.insertOne (req.body);
    respond(res,result ,201,"collection created");
})
createRouter.post("/logs",async (req,res)=>{
    let result = await cs.createCappedTable("logs");
    respond(res,result ? {ok : 1} : null,201,"collection created");
})