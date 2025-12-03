// token.ts

import jwt from "jsonwebtoken";

if (!process.env.URL_TOKEN_SECRET) {
  throw new Error("URL_TOKEN_SECRET não definido no .env");
}

const SECRET: string = process.env.URL_TOKEN_SECRET;

export function generateUserToken(payload: { id: number | string; cargo?: string | null }): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}