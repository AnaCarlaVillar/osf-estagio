import { Request, Response } from 'express';

const newPath = "pages/home/index";

exports.page = (req: Request, res: Response) => { res.render(newPath, { page: "home", title: "Home" }); };