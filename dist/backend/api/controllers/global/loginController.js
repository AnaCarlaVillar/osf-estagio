import bcrypt from "bcryptjs";
import * as model from "../../models/registerUsuarioModel.js";
import * as funcionarioLoginModel from "../../models/funcionarioLoginModel.js";
const newPath = "pages/auth/login/index";
export const page = (req, res) => {
    res.render(newPath, { page: "login", title: "Login" });
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error("\x1b[0mCampos obrigatórios ausentes");
        const user = await model.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.senha))) {
            throw new Error("\x1b[0mUsuário não encontrado ou senha incorreta");
        }
        if (user.ativo === 0)
            throw new Error("\x1b[0mUsuário bloqueado");
        const cargoResult = await funcionarioLoginModel.getCargo(user.id);
        const cargo = cargoResult?.cargo ?? null;
        console.log(`✅ - Login: \x1b[92m${email}\x1b[0m, \x1b[92m${user.senha}\x1b[0m, \x1b[92m${cargo}\x1b[0m\n`);
        return res.redirect("/home");
    }
    catch (err) {
        console.error("❌ - Login: \x1b[31m$", err, "\x1b[0m\n");
        return res.redirect("/login?error=db");
    }
};
//# sourceMappingURL=loginController.js.map