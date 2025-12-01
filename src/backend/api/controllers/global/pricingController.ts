import { Request, Response } from 'express';

const newPath = "pages/shop/pricing/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "pricing", title: "Pricing" }); };