import { requireAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const user = await requireAdmin();
    const data = await req.formData();
    console.log(data);
    const name  = data.get("name")?.toString() ?? "";
    const description = data.get("description")?.toString() ?? "";
    await prisma.project.create({
        data: { name: name , ownerId:  user.id , description: description}
    })
    return Response.redirect(new URL("/projects", req.url));
}