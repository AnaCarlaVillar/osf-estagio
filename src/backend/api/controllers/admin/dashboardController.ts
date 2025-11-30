import { Request, Response } from 'express';

const newPath = "pages/admin/dashboard/index";

exports.page = (req: Request, res: Response) => { res.render(newPath, { page: "dashboard", title: "Dashboard" }); };