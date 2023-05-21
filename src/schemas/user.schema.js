import joi from "joi";

export const userSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
    confirmPassword: joi.string().valid(joi.ref("password")).required()
})
export const userLoginSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(3)
})