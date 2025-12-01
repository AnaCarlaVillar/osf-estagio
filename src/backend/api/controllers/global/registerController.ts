import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import * as model from "../../models/registerUsuarioModel.js";

const newPath = "pages/auth/register/index";

export const page = (req: Request, res: Response) => {
  res.render(newPath, { page: "register", title: "Register" });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).send("Todos os campos são obrigatórios.");

    if (await model.findByEmail(email)) return res.status(409).send("Email já cadastrado.");

    const hash = await bcrypt.hash(password, 10);
    await model.registerNewUser(name, email, hash);

    console.log(`✅ - Register: \x1b[92m${email}\x1b[0m, \x1b[92m${hash}\x1b[0m\n`);

    return res.redirect("/home");

  } catch (err) {
    console.error('❌ - Register: \x1b[31m$', err ,'\x1b[0m\n');

    return res.status(500).send("Erro ao registrar usuário.");
  }
};