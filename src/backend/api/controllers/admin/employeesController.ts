import { Request, Response } from 'express';

const newPath = "pages/admin/components/employees/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "employees", title: "Employees" }); };