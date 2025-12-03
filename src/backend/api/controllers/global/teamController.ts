// teamController.ts

import { Request, Response } from 'express';

const newPath = "pages/shop/team/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    const service = req.query.service;
    res.render(newPath, { page: "team", title: "Team", token, service });
};