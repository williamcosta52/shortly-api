import { nanoid } from "nanoid";
import { verifyByToken, findUrlById, findShortUrl } from "../repositories/urls.repositories.js"

export async function urlShort(req, res) {
    const { authorization } = req.header;
    const token = authorization?.replace('Bearer ', '');
    const { url } = req.body;
    const shortUrl = nanoid();
    if (!token) return res.sendStatus(401);
    try {
        const verifyUser = await verifyByToken(token);
        if (verifyUser.rows[0].length === 0) return res.sendStatus(401);
        const user = verifyUser.rows[0];
        await insertUrl(url, shortUrl, user);
        res.sendStatus(201);
    } catch (err) {
        res.send(err.message);
    }
}
export async function getUrlById(req, res) {
    const { id } = req.params;
    try {   
        const findUrls = await findUrlById(id);
        if (findUrls.rows[0].length === 0) return res.status(404).send({message: "url não existe"});
        const urls = findUrls.rows.map((u) => (
            {
                id: u.id,
                shortUrl: u.shortUrl,
                url: u.url
            }
        ))
                return res.status(200).send(urls);
    } catch (err) {
        res.send(err.message);
    }
}
export async function getShortUrl(req, res){
    const { shortUrl } = req.params;
    try {
        const resultShortUrl = await findShortUrl(shortUrl);
        if (resultShortUrl.rows[0].length === 0) return res.status(404).send({message: "url não encontrada"});
        res.redirect(resultShortUrl.rows[0].url);
    } catch (err) {
        res.send(err.message);
    }
}