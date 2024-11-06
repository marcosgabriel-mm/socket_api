import pkg from 'pg';
import '../config/config.js';

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const db = {
    query: async (text, params) => {
        const client = await pool.connect();
        try {
            const res = await client.query(text, params);
            return res;
        } catch (err) {
            console.error('Error executing query', err.stack);
            throw err;
        } finally {
            client.release();
        }
    }
};

export default db;