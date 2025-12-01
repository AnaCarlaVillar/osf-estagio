import { Request, Response } from "express";

const newPath = "pages/home/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "home", title: "Home" }); };