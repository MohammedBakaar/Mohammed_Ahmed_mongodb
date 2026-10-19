import express from "express";
import { PORT } from "./config/config.service.js";
import { db ,connect } from "./db/index.js";
import { bookRouter , logRouter , createRouter } from "./modules/index.js";
import globalErrorHandler from "./common/globalErrorHandler.js";
import { respond } from "./common/respond.js";

const app = express();

await connect();

app.use(express.json());

app.use("/book", bookRouter);
app.use("/log", logRouter);
app.use("/collection",createRouter );

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
