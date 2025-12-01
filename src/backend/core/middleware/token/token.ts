import jwt from "jsonwebtoken";

const SECRET = process.env.URL_TOKEN_SECRET || "default_secret";

export function generateUserToken(userId: number | string): string {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "1h" });
}
