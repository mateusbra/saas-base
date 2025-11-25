import { requireAdmin } from "@/lib/auth"
import prisma from "@/lib/prisma"
import ProjectDashboard from "./ProjectDashboard"



export default async function ProjectsPage() {
    const user = await requireAdmin();
    const projects = await prisma.project.findMany({
        where: { ownerId: user.id }
    })
  return (
    <ProjectDashboard projects={projects}/>
    )
}

