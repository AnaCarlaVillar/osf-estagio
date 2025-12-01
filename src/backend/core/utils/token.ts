import jwt from "jsonwebtoken";

if (!process.env.URL_TOKEN_SECRET) {
  throw new Error("URL_TOKEN_SECRET não definido no .env");
}

const SECRET: string = process.env.URL_TOKEN_SECRET;

export function generateUserToken(userId: number | string): string {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "1h" });
}