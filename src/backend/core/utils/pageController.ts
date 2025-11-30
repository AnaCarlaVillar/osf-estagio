import { Request, Response } from 'express';

const fs = require("fs");
const path = require("path");

// Root of the project → 2 folders up from backend/core/utils
const ROOT = path.join(__dirname, "../../../../");

type LoadDataFn = (req: Request, res: Response) => Promise<any> | any;
exports.showPage = (relativeFrontendPath: string, loadData?: LoadDataFn) => {
  return async (req: Request, res: Response) => {
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
        html = html.replace(
          "</body>",
          `<script>window.pageData = ${JSON.stringify(data)}</script></body>`
        );
      }

      res.send(html);
    } catch (err) {
      console.error("Error in showPage:", err);
      res.status(500).send("Internal server error");
    }
  };
};