import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "../../../../");
export const showPage = (relativeFrontendPath, loadData) => {
    return async (req, res) => {
        try {
            const filePath = path.join(ROOT, relativeFrontendPath);
            if (!loadData) {
                return res.sendFile(filePath);
            }
            let html = fs.readFileSync(filePath, "utf8");
            const data = await loadData(req, res);
            if (data) {
                html = html.replace("</body>", `<script>window.pageData = ${JSON.stringify(data)}</script></body>`);
            }
            res.send(html);
        }
        catch (err) {
            console.error("Error in showPage:", err);
            res.status(500).send("Internal server error");
        }
    };
};
//# sourceMappingURL=pageController.js.map