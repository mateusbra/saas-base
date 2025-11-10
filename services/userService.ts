"use server";
import prisma from "@/lib/prisma";


export async function createUser(data: { email: string; password: string }) {
    return prisma.user.create({ data });
}


export async function signupAction(form: FormData) {
    
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    await createUser({ email, password });
}