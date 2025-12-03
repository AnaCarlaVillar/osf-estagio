// pageController.ts

import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, "../../../../");

type LoadDataFn = (req: Request, res: Response) => Promise<any> | any;

export const showPage = (relativeFrontendPath: string, loadData?: LoadDataFn) => {
  return async (req: Request, res: Response) => {
    try {

      const filePath = path.join(ROOT, relativeFrontendPath);

      if (!loadData) {
        return res.sendFile(filePath);
      }

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