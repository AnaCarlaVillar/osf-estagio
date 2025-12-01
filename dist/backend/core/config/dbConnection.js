import dotenv from "dotenv";
dotenv.config({ override: true });
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import path from 'path';
import process from 'process';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_NAME = process.env.DB_NAME;
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
(async () => {
    try {
        const conn = await pool.getConnection();
        conn.release();
        console.log('│\x1b[0m    •\x1b[93m', DB_NAME, '\x1b[0m                                         \x1b[90m│');
        console.log('│                                                             │');
        console.log('╰─────────────────────────────────────────────────────────────╯\x1b[0m\n');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('│\x1b[0m    •\x1b[31m', err.message, '\x1b[0m                        \x1b[90m│');
        }
        else {
            console.error('│                                                             │');
            console.error('│\x1b[0m    •\x1b[31m', String(err), '\x1b[0m                        \x1b[90m│');
        }
        console.error('│                                                             │');
        console.error('╰─────────────────────────────────────────────────────────────╯\x1b[0m\n');
        process.exit(1);
    }
})();
export default pool;
//# sourceMappingURL=dbConnection.js.map