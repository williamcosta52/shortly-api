import db from "../database/database.connection.js"

export async function verifyUserDB(email){
    try {
        const result = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
        return result;
    } catch (err){
        return err.message;
    }
}
export async function inserUserDB(name, email, encryptPassword){
    try {
        const result = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, encryptPassword]);
        return result;
    } catch (err){
        return err.message;
    }
}
export async function findUserByToken(token){
    try {
        const result = await db.query(`SELECT * FROM users WHERE token=$1`, [token])
        return result;
    } catch (err) {
        return err.message;
    }
}
export async function findUserUrls(userId){
    try {
        const result = await db.query(`SELECT SUM(clicks) as totalClicks FROM urls WHERE 'userId'= $1`, [userId]);
        return result;
    } catch (err) {
        return err.message;
    }
}   
export async function insertTokenUser(token, email){
    try {
        const result = await db.query(`UPDATE users SET token=$1 WHERE email=$2`, [token, email]);
        return result;
    } catch (err) {
        return err.message;
    }
}