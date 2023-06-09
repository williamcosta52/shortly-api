import db from "../database/database.connection.js";

export async function getCounts() {
	try {
		const result =
			await db.query(`SELECT users.id, users.name, COUNT(urls.id) AS linksCount, COALESCE(SUM(urls."visitCount"), 0) AS visitCount
			FROM users
			LEFT JOIN urls ON users.id = urls."userId"
			GROUP BY users.id, users.name
			ORDER BY visitCount DESC LIMIT 10;`);
		return result;
	} catch (err) {
		return err.message;
	}
}
