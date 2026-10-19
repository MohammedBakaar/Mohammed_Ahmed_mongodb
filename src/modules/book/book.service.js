
import { json } from "express";
import { bookModel } from "../../db/index.js"

export const insertOne = async (data)=>{
    return await bookModel.insertOne(data).catch(e => 
        {throw new Error("Validation error",{cause:400});
     })
}
export const insertMany = async (data)=>{
     return await bookModel.insertMany(data).catch(e => 
        {throw new Error("Validation error",{cause:400});
     })
}
export const updateFuture = async ()=>{
     return await bookModel.updateOne(
        {title : "Future"},{ $set : {year : 2022 }}
    ).catch(e => 
        {throw new Error("Book not found",{cause:400});
     })
}
export const findOne = async (data)=>{
     return await bookModel.findOne({title :data})
}
export const findByDate = async (from,to)=>{
     return await bookModel.find({
        $and : [{year : {$gte:from}},{year : {$lte:to}}]
    })
}

// db.Books.updateOne({title : "Future"},{ $set : {year : 2022 }})
