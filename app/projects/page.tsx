import { requireAdmin } from "@/lib/auth"
import ProjectDashboard from "./ProjectDashboard"
import { getUserProjects } from "@/services/projectsService";
import { Project } from "@prisma/client";

export default async function ProjectsPage() {
    const user = await requireAdmin();
    const projects = await getUserProjects(user) as Project[];
  return (
    <ProjectDashboard user={user} projects={projects}/>
    )
}
