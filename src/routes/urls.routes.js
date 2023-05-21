import { Router } from "express";
import { urlShort } from "../controllers/urls.controller.js";
import { validateUrl } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateUrl(urlSchema) ,urlShort);