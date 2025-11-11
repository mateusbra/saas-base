"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createUser(data: { email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
        data: {
            email: data.email,
            password: hashed,
        },
    });
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

    (await cookies()).set("session", user.id.toString(), {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
    });
    console.log("logged in!");
    redirect("/dashboard");
}