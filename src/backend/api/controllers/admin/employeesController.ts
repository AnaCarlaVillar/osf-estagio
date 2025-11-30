import { Request, Response } from 'express';

const newPath = "pages/admin/components/employees/index";

exports.page = (req: Request, res: Response) => { res.render(newPath, { page: "employees", title: "Employees" }); };