import { inserUserDB, verifyUserDB } from "../repositories/users.repositories.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp(req, res){
    const { name, email, password } = req.body;
    const encryptPassword = bcrypt.hashSync(password, 10);
    try {
        const verifyUser = await verifyUserDB(email);
        if (verifyUser.rows[0].length !== 0) return res.status(409).send({message: "email já cadastrado"});
        await inserUserDB( name, email, encryptPassword );
        res.sendStatus(201);
    } catch (err){
        res.send(err.message);
    }
}
export async function signIn(req, res){
    const { email, password } = req.body;
    console.log("aaaaaaaaaaa")
    try {
        const verifyUser = verifyUserDB(email);
        if (verifyUser.rows[0].length === 0) return res.status(401).send({message: "email não cadastrado"});
        if (verifyUser.rows[0].password !== password) return res.status(401).send({message: "senha inválida"});
        const token = uuid();
        res.status(200).send({token: token});
    } catch (err){
        res.send(err.message);
    }
}