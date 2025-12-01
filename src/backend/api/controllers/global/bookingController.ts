import { Request, Response } from 'express';

const newPath = "pages/shop/booking/index";

export const page = (req: Request, res: Response) => { res.render(newPath, { page: "booking", title: "Booking" }); };