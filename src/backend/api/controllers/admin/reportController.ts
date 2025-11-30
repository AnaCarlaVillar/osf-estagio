import { Request, Response } from 'express';

const newPath = "pages/admin/report/index";

exports.page = (req: Request, res: Response) => { res.render(newPath, { page: "report", title: "Report" }); };