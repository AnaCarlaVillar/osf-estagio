import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbConfig = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  multipleStatements: true,
};

const DB_NAME = process.env.DB_NAME;

// eslint-disable-next-line no-control-regex
const stripAnsi = (str: string): string => str.replace(/\x1b\[[0-9;]*m/g, '');

function logFileLine(file: string) {
  const totalWidth = 63;
  const left = `│\x1b[0m      ╰ \x1b[93m${file}\x1b[0m`;
  const visibleLength = stripAnsi(left).length;
  const spaces = Math.max(totalWidth - visibleLength - 1, 0);
  const padding = ' '.repeat(spaces);
  console.log(`${left}${padding}\x1b[90m│`);
}

async function createDatabase() {
  const connection = await mysql.createConnection(dbConfig);
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`
  );

  console.log(`\n\x1b[90m╭────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m────────────────────────╮`);
  console.log(`│                                                             │`);
  console.log(`\x1b[92m◆  Database Setup\x1b[0m:                                            \x1b[90m│`);

  await connection.end();
}

async function runSqlFiles(folder: string) {
  const connection = await mysql.createConnection({
    ...dbConfig,
    database: DB_NAME as string,
  });

  const files = fs.readdirSync(folder)
    .filter((f: string) => f.endsWith('.sql'))
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

    // dynamic import for ESM
    const { adminSeed } = await import('./seeds/adminSeed.js');

    console.log(`│\x1b[0m    • \x1b[38;2;255;170;170mSeeds\x1b[0m:                                                 \x1b[90m│`);
    await runSqlFiles(path.join(__dirname, 'seeds'));
    await adminSeed();

    console.log('│                                                             │');
    console.log(`\x1b[92m◆  Success\x1b[0m                                                    \x1b[90m│`);
    console.log('│                                                             │');
    console.log('╰─────────────────────────────────────────────────────────────╯\x1b[0m\n');

  } catch (err) {
    console.error(err);
  }
})();