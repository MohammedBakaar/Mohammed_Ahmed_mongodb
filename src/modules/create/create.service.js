import { db } from "../../db/index.js"

export const createTable = async (name)=>{
   return await db.createCollection(name,{ validator : {
    title : { $type : "string"}
   }})
}
export const insertOne= async (data)=>{
    return await db.collection("authors").insertOne(data).catch( e => {
        throw new Error("validation error",{cause: 400})
    })
}
export const createCappedTable = async (name)=>{
   return await db.createCollection(name,{capped:true,size:1024*1024})
}

export const createIndex = async (name)=>{
    return await db.collection("books").createIndex("title");
}