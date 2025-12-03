// homeController.ts

import { Request, Response } from "express";

const newPath = "pages/home/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    const cargo = req.user?.cargo;
    res.render(newPath, { page: "home", title: "Home", token, cargo });
};