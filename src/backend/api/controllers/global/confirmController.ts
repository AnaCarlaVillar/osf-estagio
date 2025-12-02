import { Request, Response } from 'express';

const newPath = "pages/shop/confirm/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    res.render(newPath, { page: "confirm", title: "Confirm", token });
};