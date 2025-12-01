process.env.DOTENV_LOG = "false";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({ override: true });
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`\n\x1b[90m╭────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m────────────────────────╮`);
    console.log(`│                                                             │`);
    console.log(`\x1b[92m◆  Server\x1b[0m:                                                    \x1b[90m│`);
    console.log(`│\x1b[0m    • \x1b[36mhttp://localhost:${PORT}\x1b[0m                                  \x1b[90m│`);
});
//# sourceMappingURL=start.js.map