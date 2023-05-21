import { nanoid } from "nanoid";

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