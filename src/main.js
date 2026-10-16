import express from "express";
import { PORT } from "./config/configservece.js";
import { db ,connect } from "./db/connection.js";
import { bookRouter , logRouter , collectionRouter } from "./modules/index.js";
import globalErrorHandler from "./common/globalErrorHandler.js";

const app = express();

await connect();

app.use(express.json());

app.get("/",async (req,res)=>{
  let result = await db.collection("Books").findOne()
  res.status(200).json(result)
})

app.use("/book", bookRouter);
app.use("/log", logRouter);
app.use("/collection", collectionRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
