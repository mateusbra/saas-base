'use client'
import { Project, User } from "@prisma/client";
import { useState } from "react";
import { deleteProject } from "@/services/projectsService";
interface Props {
    user: User;
    projects: Project[];
}

export default function ProjectDashboard({ user,projects }: Props) {
    const [activeProjectID, setActiveProjectID] = useState<string | null>(projects[0]?.id || null);//sets the first project id
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [projectsList, setProjectsList] = useState<Project[]>(projects);
    const activeProject = projectsList.find(p => p.id == activeProjectID);
    return (
        <div className="min-h-screen flex justify-center py-8 px-4">
            <div className="flex flex-col md:flex-row bg-neutral-900 rounded-lg w-full max-w-6xl">
                <aside className="w-full md:w-64 p-6 md:pt-20 md:pl-10 border-b md:border-b-0 md:border-r border-neutral-700">
                    <h2 className="my-3 font-bold text-lg">Projects</h2>
                    <ul className="space-y-3">
                        {projectsList.map(p =>
                            <div key={p.id+"div"} className="flex items-center justify-between">
                            <li key={p.id+"li"} onClick={() => setActiveProjectID(p.id)}
                                className={`cursor-pointer transition ${p.id === activeProjectID ? "font-semibold" : ""}`}>{p.name}</li>
                                <button key={p.id+"button"} className="bg-red-500 text-white p-1 rounded mr-2 hover:bg-red-600 transition" onClick={async () => {
                                    await deleteProject(user,p.id,projectsList);
                                    const updatedList = projectsList.filter(pl => pl.id !== p.id);
                                    setProjectsList(updatedList);
                                    setActiveProjectID(updatedList[0]?.id || null);
                                }
                                 }>Delete</button>
                                </div>
                        )}
                    </ul>
                    <button onClick={() => setIsModalOpen(true)} className="bg-neutral-700 hover:bg-neutral-800 cursor-pointer rounded-lg p-2 mt-3 transition">+ New Project</button>
                </aside>
                <div className="mr-10 border-l border-neutral-700" />
                <main className="flex-1 p-6 md:pt-20">
                    <h1 className="font-black text-4xl">Dashboard</h1>
                    <h3 className="mt-10 text text-neutral-400">Description</h3>
                    <section className="mt-3 bg-neutral-800 rounded h-64 mr-10">
                        <div className="p-3" >{activeProject?.description ?? "no description"}</div>
                    </section>
                </main>
                {isModalOpen && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal */}
                        <div className="fixed z-50 inset-0 flex items-center justify-center">
                            <div className="bg-neutral-800 p-6 rounded-xl w-96 shadow-xl">
                                <h2 className="text-xl font-bold mb-4">Create new project</h2>
                                <form method="POST" action="/api/projects">
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Project name"
                                        className="w-full p-2 rounded bg-neutral-700 mb-4"
                                    />
                                    <input
                                        name="description"
                                        type="text"
                                        placeholder="Description"
                                        className="w-full p-2 rounded bg-neutral-700 mb-4"
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded"
                                        >
                                            Cancel
                                        </button>

                                        <button type="submit"
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

