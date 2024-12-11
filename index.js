import express from "express";
import cors from "cors";
import connectionDB from "./DB/Connection.DB.js";
import userRouter from "./src/models/routers/userRouter/userRouter.router.js";
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

//Data Base
connectionDB();

//Apis
// user Api
app.use("/user", userRouter);
// routes
app.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Server is running",
  });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
