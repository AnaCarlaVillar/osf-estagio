// teamController.ts

import { Request, Response } from 'express';
import * as funcionarioModel from '../../models/funcionarioModel.js';

const newPath = "pages/shop/team/index";

export const page = async (req: Request, res: Response) => {
    const token = req.params.token;
    const service = req.query.service;
    const barbers = await funcionarioModel.getAllBarbeiros();
    res.render(newPath, { page: "team", title: "Team", token, service, barbers });
};