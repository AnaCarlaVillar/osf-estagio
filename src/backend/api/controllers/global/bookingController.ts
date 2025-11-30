import { Request, Response } from 'express';

const newPath = "pages/shop/booking/index";

exports.page = (req: Request, res: Response) => { res.render(newPath, { page: "booking", title: "Booking" }); };