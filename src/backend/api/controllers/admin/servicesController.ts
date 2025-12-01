import { Request, Response } from 'express';

const newPath = "pages/admin/components/services/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "services", title: "Services" }); };