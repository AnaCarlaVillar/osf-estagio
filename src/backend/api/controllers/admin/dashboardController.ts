// dashboardController.ts

import { Request, Response } from 'express';

const newPath = "pages/admin/dashboard/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    res.render(newPath, { page: "dashboard", title: "Dashboard", token });
};