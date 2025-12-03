// start.ts

import dotenv from "dotenv";
dotenv.config({ override: true });
process.env.DOTENV_LOG = "false";

import app from "./app.js";
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  console.log(`\n\x1b[90m╭────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m────────────────────────╮`);
  console.log(`│                                                             │`);
  console.log(`\x1b[92m◆  Server\x1b[0m:                                                    \x1b[90m│`);
  console.log(`│\x1b[0m    • \x1b[36mhttp://localhost:${PORT}\x1b[0m                                  \x1b[90m│`)
});