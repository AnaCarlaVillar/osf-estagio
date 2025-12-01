import { Request, Response } from 'express';

const newPath = "pages/shop/booking/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    res.render(newPath, { page: "booking", title: "Booking", token });
};