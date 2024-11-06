import db from '../config/db.js';

class Log {

    static async findLogsByUserId(userId) {
        const query = `SELECT * FROM access_logs WHERE user_id = $1`;

        try {
            const response = await db.query(query, [userId]);
            return response.rows;
        } catch (error) {
            console.error('Error executing query', error.stack);
            throw error;
        }
    }

    static async saveLog(log) {
        const query = `INSERT INTO access_logs (access_date, user_id, access_type, access_status) VALUES (NOW(), $1, $2, 0) RETURNING *`;

        try {
            const response = await db.query(query, [log.user_id, log.access_type]);
            return response.rows[0];
        } catch (error) {
            console.error('Error executing query', error.stack);
            throw error;
        }
    }

}

export default Log;