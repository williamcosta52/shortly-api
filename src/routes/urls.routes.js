import { Router } from "express";
import { deleteUrlById, getShortUrl, getUrlById, urlShort } from "../controllers/urls.controller.js";
import { validateUrl } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schema.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateUrl(urlSchema) ,urlShort);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", getShortUrl);
urlRouter.delete("/urls/:id", deleteUrlById);

export default urlRouter;