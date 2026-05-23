// bookingController.ts

import { Request, Response } from 'express';
import * as funcionarioModel from '../../models/funcionarioModel.js';

const newPath = "pages/shop/booking/index";

export const page = async (req: Request, res: Response) => {
    const token = req.params.token;
    const service = req.query.service;
    const barber = req.query.barber;
    const cargo = req.user?.cargo;
    const isBarber = cargo !== null && cargo !== undefined;
    const barbers = await funcionarioModel.getAllBarbeiros();
    
    res.render(newPath, { page: "booking", title: "Booking", token, service, barber, isBarber, barbers });
};