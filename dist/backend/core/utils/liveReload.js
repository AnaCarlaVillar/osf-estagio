import path from "path";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default function setupDevReload(app) {
    try {
        const liveReloadServer = livereload.createServer({
            exts: ["html", "css", "js", "ts"],
            delay: 50,
        });
        liveReloadServer.watch(path.join(__dirname, "../../../frontend"));
        app.use(connectLivereload());
        liveReloadServer.server.on("connection", () => {
        });
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
//# sourceMappingURL=liveReload.js.map