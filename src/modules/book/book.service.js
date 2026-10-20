
import { json } from "express";
import { bookModel, logModel } from "../../db/index.js"

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
export const findByGenre = async (genre)=>{
     return await bookModel.find({genres : { $elemMatch : {  $eq : genre}} },{projection:{_id : 0}}).toArray()
}
export const getWithLimit = async ()=>{
     return await bookModel.find().skip(2).limit(3).sort({year : -1}).toArray()
}

export const getIntYear = async ()=>{
     return await bookModel.find({ year : {$type : "int"}}).toArray()
}
export const getExcludeGenres = async ()=>{
     return await bookModel.find({genres: { $nin: ["Science Fiction", "Horror"] }},{projection:{_id : 0}}).toArray()
}
export const deleteBefore = async (year)=>{
     return await bookModel.deleteMany({year : { $lt : Number(year)}});
}
export const aggregate1 = async (year)=>{
     return await bookModel.aggregate([{
    $match:{year:{ $gt: 2000 }}},{    $sort: {year: -1}}]);;
}
export const aggregate2 = async (year)=>{
     return await bookModel.aggregate([{
    $match:{year:{ $gt: 2000 }}},{ $project :{_id : 0 , title :1, author :1 ,year :1 }}]);;
}
export const aggregate3 = async (year)=>{
     return await bookModel.aggregate([{
    $unwind:"genres"}]);;
}
export const aggregate4 = async (year)=>{
     return await bookModel.aggregate([ { $lookup : {
          from : logModel,
          localField : "_id",
          foreignField :"book_id" ,
          as : "book logs"
     }}]);;
}