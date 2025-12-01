import { Request, Response } from 'express';

const newPath = "pages/admin/components/employees/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    res.render(newPath, { page: "employees", title: "Employees", token });
};