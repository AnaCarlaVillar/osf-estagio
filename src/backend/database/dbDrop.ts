// dbDrop.ts

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME;

async function dropDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST as string,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      multipleStatements: true,
    });

    await connection.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\``);
      console.log(`\n\x1b[90m╭────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m────────────────────────╮`);
      console.log(`│                                                             │`);
      console.log(`\x1b[92m◆  Database Dropped\x1b[0m:                                          \x1b[90m│`);
      console.log(`│\x1b[0m    •  \x1b[93m${DB_NAME}\x1b[0m                                           \x1b[90m│`);
      console.log(`│                                                             │`);
      console.log('╰─────────────────────────────────────────────────────────────╯\x1b[0m\n');

    await connection.end();
  } catch (err) {
    console.error(err);
  }
}

dropDatabase();