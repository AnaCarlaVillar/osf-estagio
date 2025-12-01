import jwt from "jsonwebtoken";
const SECRET = process.env.URL_TOKEN_SECRET;
if (!SECRET)
    throw new Error("URL_TOKEN_SECRET não definido no .env");
export default function session(req, res, next) {
    try {
        const token = req.params.token || req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).send("Token não fornecido");
        const decoded = jwt.verify(token, SECRET);
        req.user = { id: decoded.id, cargo: decoded.cargo };
        next();
    }
    catch (err) {
        return res.status(401).send("Token inválido ou expirado");
    }
}
//# sourceMappingURL=session.js.map