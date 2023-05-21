import db from "../database/database.connection";

export async function verifyByToken(token){
    try {
        const verifyToken = await db.query(`SELECT * FROM users WHERE token=$1`, [token]);
        return verifyToken;
    } catch (err) {
        return err.message;
    }
}
export async function insertUrl(url, shortUrl, user){
    try {
        const result = await db.query(`INSERT INTO urls (url, shortUrl, userId, clicks) VALUES ($1, $2, $3)`, [url, shortUrl, user.id]);
        return result;
    } catch (err) {
        return err.message;
    }
}
export async function findUrlById(id){
    try {
        const result = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]);
        return result;
    } catch (err) {
        return err.message;
    }
}
export async function findShortUrl(shortUrl){
    try {
        const result = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl]);
        return result;
    } catch (err) {
        return err.message;
    }
}