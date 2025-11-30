import { Request, Response } from 'express';

const newPath = "pages/shop/pricing/index";

exports.page = (req: Request, res: Response) => { res.render(newPath, { page: "pricing", title: "Pricing" }); };