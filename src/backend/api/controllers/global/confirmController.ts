import { Request, Response } from 'express';

const newPath = "pages/shop/confirm/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    const service = req.query.service;
    const barber = req.query.barber;
    const datetime = req.query.datetime
    res.render(newPath, { page: "confirm", title: "Confirm", token, service, barber, datetime });
};