import { Request, Response } from 'express';

const newPath = "pages/shop/pricing/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    res.render(newPath, { page: "pricing", title: "Pricing", token });
};