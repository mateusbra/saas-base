import { cookies } from "next/headers";
import prisma from "./prisma";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
interface JWTPayload {
    id: number;
    iat?: number;
    exp?: number;
  }
  
export async function requireAdmin() {
  const token = (await cookies()).get("session")?.value;
  console.log(token);
  if (!token) 
    redirect("/login");

  const data = jwt.verify(token, JWT_SECRET) as JWTPayload;
  console.log(data);
  const user = await prisma.user.findUnique({ where: { id: data.id } });

  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  return user;
}