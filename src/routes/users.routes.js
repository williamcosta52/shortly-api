import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { userLoginSchema, userSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const userRouter = Router();

userRouter.post("/signup" , validateSchema(userSchema), signUp);
userRouter.post("/signin" , validateSchema(userLoginSchema), signIn);

export default userRouter;