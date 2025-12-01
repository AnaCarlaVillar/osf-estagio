import jwt from "jsonwebtoken";
import * as model from "../../api/models/usuarioModel.js";
const SECRET = process.env.URL_TOKEN_SECRET;
if (!SECRET) {
    throw new Error("URL_TOKEN_SECRET não definido no .env");
}
export default async function auth(req, res, next) {
    try {
        // Pega token da URL ou do header Authorization
        const token = req.params.token || req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).send("Token não fornecido");
        // Decodifica token — agora o payload é um objeto com id e cargo
        const decoded = jwt.verify(token, SECRET);
        // Busca usuário no DB (opcional: validar ativo ou outros campos)
        const user = await model.findById(decoded.id);
        if (!user)
            return res.status(401).send("Token inválido");
        // Popula req.user com um objeto consistente
        req.user = { id: user.id, cargo: decoded.cargo ?? null };
        next();
    }
    catch (err) {
        console.error("❌ Auth Middleware:", err.message, err.stack);
        return res.status(401).send("Token inválido ou expirado");
    }
}
//# sourceMappingURL=auth.js.map