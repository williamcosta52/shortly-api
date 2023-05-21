import express from "express";
import cors from "cors";
import userRouter from "./routes/users.routes.js";

const app = express();
app.use(express.json());
app.use(cors);
app.use(userRouter);

app.listen(5000, () => console.log("Servidor rodando localmente"));