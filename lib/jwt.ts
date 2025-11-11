import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function signToken(payload: object, expiresIn = 3600): string { // 1 hour
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

