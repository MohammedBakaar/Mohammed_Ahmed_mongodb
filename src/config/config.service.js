import {config} from 'dotenv'
import {resolve} from 'path'


config({
    path : resolve(`.env.${process.env.NODE_ENV}`)
}
)


export const PORT = Number(process.env.PORT)
export const DB = {
    name : process.env.DB_NAME ,
    url : process.env.DB_URL
}