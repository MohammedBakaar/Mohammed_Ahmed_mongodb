import { logModel } from "../../db/index.js"

export const insertOne= async (data)=>{
    return await logModel.insertOne(data).catch( e => {
        throw new Error("validation error",{cause: 400})
    })
}



