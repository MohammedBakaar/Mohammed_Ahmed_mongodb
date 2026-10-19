import { MongoClient } from "mongodb";
import {DB} from "../config/config.service.js"



export const Client = new MongoClient(DB.url)
export const db = Client.db(DB.name)


export const connect = async ()=>{
    try {
        await Client.connect()
        console.log("DB Connected (;");
        
    } catch (err) {
        console.log("DB connection failed ):");
        
        console.error(err);
        
    }
}
