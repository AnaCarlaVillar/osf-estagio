"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true,
};
const DB_NAME = process.env.DB_NAME;
// eslint-disable-next-line no-control-regex
const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, '');
function logFileLine(file) {
    const totalWidth = 63;
    const left = `│\x1b[0m      ╰ \x1b[93m${file}\x1b[0m`;
    const visibleLength = stripAnsi(left).length;
    const spaces = Math.max(totalWidth - visibleLength - 1, 0); // -1 pro último │
    const padding = ' '.repeat(spaces);
    console.log(`${left}${padding}\x1b[90m│`);
}
async function createDatabase() {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`);
    console.log(`\n\x1b[90m╭────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m────────────────────────╮`);
    console.log(`│                                                             │`);
    console.log(`\x1b[92m◆  Database Setup\x1b[0m:                                            \x1b[90m│`);
    await connection.end();
}
async function runSqlFiles(folder) {
    const connection = await mysql.createConnection({
        ...dbConfig,
        database: DB_NAME,
    });
    const files = fs.readdirSync(folder)
        .filter((f) => f.endsWith('.sql'))
        .sort();
    for (const file of files) {
        const filePath = path.join(folder, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        logFileLine(file);
        await connection.query(sql);
    }
    await connection.end();
}
(async () => {
    try {
        await createDatabase();
        console.log(`│\x1b[0m    • \x1b[38;2;255;170;170mMigrations\x1b[0m:                                            \x1b[90m│`);
        await runSqlFiles(path.join(__dirname, 'migrations'));
        const { adminSeed } = require('./seeds/adminSeed.js');
        console.log(`│\x1b[0m    • \x1b[38;2;255;170;170mSeeds\x1b[0m:                                                 \x1b[90m│`);
        await runSqlFiles(path.join(__dirname, 'seeds'));
        await adminSeed();
        console.log('│                                                             │');
        console.log(`\x1b[92m◆  Success\x1b[0m                                                    \x1b[90m│`);
        console.log('│                                                             │');
        console.log('╰─────────────────────────────────────────────────────────────╯\x1b[0m\n');
    }
    catch (err) {
        console.error(err);
    }
})();
//# sourceMappingURL=dbSetup.js.map