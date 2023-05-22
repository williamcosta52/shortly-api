import { Router } from "express";
import rankingRouter from "./ranking.routes.js";
import urlRouter from "./urls.routes.js";
import userRouter from "./users.routes.js";

const router = Router();

router.use(rankingRouter)
router.use(urlRouter)
router.use(userRouter)

export default router;