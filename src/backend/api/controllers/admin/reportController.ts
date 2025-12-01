import { Request, Response } from 'express';

const newPath = "pages/admin/report/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "report", title: "Report" }); };