import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
