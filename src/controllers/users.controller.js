import { findUserByToken, findUserUrls, inserUserDB, insertTokenUser, verifyUserDB } from "../repositories/users.repositories.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { findUrlById } from "../repositories/urls.repositories.js";

export async function signUp(req, res){
    const { name, email, password } = req.body;
    const encryptPassword = bcrypt.hashSync(password, 10);
    try {
        const verifyUser = await verifyUserDB(email);
        if (verifyUser.rows.length) return res.status(409).send({message: "email já cadastrado"});
        await inserUserDB( name, email, encryptPassword );
        res.sendStatus(201);
    } catch (err){
        res.send(err.message);
    }
}
export async function signIn(req, res){
    const { email, password } = req.body;
    try {
        const verifyUser = await verifyUserDB(email);
        if (!verifyUser.rows.length) return res.status(401).send({message: "email não cadastrado"});
        if (verifyUser.rows[0].password !== password) return res.status(401).send({message: "senha inválida"});
        const token = uuid();
        await insertTokenUser(token, email);
        res.status(200).send({token: token});
    } catch (err){
        res.send(err.message);
    }
}
export async function getUserInfos(req, res){
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        if (!token) return res.sendStatus(401);
        
    try {
        const findUser = await findUserByToken(token);
        const user = findUser.rows[0];
        const findUrl = await findUserUrls(user.id);
        const url = findUrl.rows[0].totalClicks;
        const findShortUrls = await findUrlById(user.id);
        const shortUrls = findShortUrls.rows.map((u) => (
            {
                id: u.id,
                shortUrl: u.shortUrl,
                url: u.url,
                visitCount: u.clicks
            }
        ));
        const userInfo = {
            id: user.id,
            name: user.name,
            visitCount: url,
            shortenedUrls: shortUrls
        }
        res.status(200).send(userInfo);
    } catch (err){
        res.send(err.message);
    }
}