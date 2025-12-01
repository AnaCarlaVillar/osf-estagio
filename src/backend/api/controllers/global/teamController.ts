import { Request, Response } from 'express';

const newPath = "pages/shop/team/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "team", title: "Team" }); };