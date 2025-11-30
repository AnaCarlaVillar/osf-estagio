"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
function setupDevReload(app) {
    try {
        const liveReloadServer = livereload.createServer({
            exts: ['html', 'css', 'js', 'ts'],
            delay: 50,
        });
        liveReloadServer.watch(path.join(__dirname, "../../../frontend"));
        app.use(connectLivereload());
        liveReloadServer.server.on("connection", () => {
        });
        //console.log('\n\x1b[90m╭──────────────────────────────\x1b[38;5;153mOsf\x1b[0m\x1b[90m─\x1b[0m\x1b[38;5;153mBarbearia\x1b[0m\x1b[90m──────────────────────────────╮\n│                                                                         │\x1b[0m\n\x1b[92m◆  LiveReload\x1b[0m                                                             \x1b[90m│\n│                                                                         │');
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error("Unknown error:", err);
        }
    }
}
module.exports = setupDevReload;
//# sourceMappingURL=liveReload.js.map