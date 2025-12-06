"use server"
import prisma from "@/lib/prisma"
import { Project, User } from "@prisma/client"
import { redis } from "@/lib/redis"

export async function getUserProjects(user : User) {
    const cacheKey = `user:${user.id}:projects`;
    //tryes cache
    const cached = await redis.get(cacheKey);
    if(cached)
        return cached;

    const projects = await prisma.project.findMany({
        where: { ownerId: user.id }
    })

    redis.set(cacheKey,projects, {ex: 60*2}); // 2 minutes
    return projects;
}

export async function deleteProject(user: User, projectId: string, projects : Project[]){
    const cacheKey = `user:${user.id}:projects`;
    const updatedList = projects.filter(p => p.id !== projectId);
    redis.set(cacheKey,updatedList);
    await prisma.project.delete({
        where: { id: projectId }
    })
}