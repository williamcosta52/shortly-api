import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDB = {
	connectionString: process.env.DATABASE_URL,
}

const db = new Pool(configDB);

export default db;