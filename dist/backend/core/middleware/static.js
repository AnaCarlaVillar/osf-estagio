// static.ts
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default (app) => {
    app.use("/public", express.static(path.join(__dirname, "../../../frontend/public")));
};
//# sourceMappingURL=static.js.map