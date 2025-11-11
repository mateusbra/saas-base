"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signToken, verifyToken } from "@/lib/jwt";

export async function getCurrentUser(){
    const cookieStore = cookies();
    const token = (await cookieStore).get("session")?.value;
  
    if (!token) return null;
  
    try {
      const payload = verifyToken(token) as { id: number };
      if (!payload?.id) return null;
  
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });
  
      return user;
    } catch (err) {
      console.log("Invalid JWT:", err);
      return null;
    }
}
export async function createUser(data: { email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    try {
        const user = await prisma.user.create({
          data: {
            email: data.email,
            password: hashed,
          },
        });
        return { success: true, user };
      } catch (error: any) {
        if (error.code === "P2002") {
          // duplicated email
          return { success: false, message: "This e-mail is already registered" };
        }
    
        console.error("error creating user:", error);
        return { success: false, message: "internal error" };
      }
}


export async function signupAction(form: FormData) {

    const email = form.get("email") as string;
    const password = form.get("password") as string;

    await createUser({ email, password });
}

export async function signinAction(form: FormData) {
    const email = form.get("email")?.toString() ?? "";
    const password = form.get("password")?.toString() ?? "";

    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        console.log("user not found");
        return;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        console.log("password not valid");
        return;
    }

    const token = signToken({ id: user.id });

    (await cookies()).set("session", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    console.log("logged in!");
    redirect("/dashboard");
}
export async function signoutAction(){
    (await cookies()).delete("session");
    console.log("user logged out!");
    redirect("/login"); 
}