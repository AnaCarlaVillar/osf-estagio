"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.DOTENV_LOG = "false";
require('dotenv').config({ override: true });
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n\x1b[90m╭────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m────────────────────────╮`);
    console.log(`│                                                             │`);
    console.log(`\x1b[92m◆  Server\x1b[0m:                                                    \x1b[90m│`);
    console.log(`│\x1b[0m    • \x1b[36mhttp://localhost:${PORT}\x1b[0m                                  \x1b[90m│`);
});
//# sourceMappingURL=start.js.map