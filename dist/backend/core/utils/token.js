// token.ts
import jwt from "jsonwebtoken";
if (!process.env.URL_TOKEN_SECRET) {
    throw new Error("URL_TOKEN_SECRET não definido no .env");
}
const SECRET = process.env.URL_TOKEN_SECRET;
export function generateUserToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}
//# sourceMappingURL=token.js.map