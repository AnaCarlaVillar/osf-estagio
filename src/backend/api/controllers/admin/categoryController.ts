// categoryController.ts

import { Request, Response } from "express";
import * as model from "../../models/categoriaModel.js";
import * as registerModel from "../../models/registerCategoriaModel.js";
import { generateUserToken } from "../../../core/utils/token.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const categorias = await model.getAll();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const categoria = await model.getById(Number(req.params.id));
    res.json(categoria);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    await registerModel.registerNewCategory(name, description);

    console.log(
      `✅ - Category: \x1b[92m${name}\x1b[0m, \x1b[92m${description}\x1b[0m\n`
    );

    if (!req.user?.id) return res.status(401).send("Usuário não autenticado");

    const token = generateUserToken({
      id: req.user.id,
      cargo: req.user.cargo ?? null,
    });

    return res.redirect(`/services/${token}`);

  } catch (err) {
    console.error("❌ - Category: \x1b[31m$", err, "\x1b[0m\n");
    return res.status(500).send("Erro ao registrar categoria.");
  }
};
