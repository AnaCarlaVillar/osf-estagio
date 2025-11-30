"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// Root of the project → 2 folders up from backend/core/utils
const ROOT = path.join(__dirname, "../../../../");
exports.showPage = (relativeFrontendPath, loadData) => {
    return async (req, res) => {
        try {
            // Always resolve from root of the project
            const filePath = path.join(ROOT, relativeFrontendPath);
            // If static HTML → works as before
            if (!loadData) {
                return res.sendFile(filePath);
            }
            // Dynamic version → injects window.data
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