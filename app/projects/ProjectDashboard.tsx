'use client'
import { Project } from "@prisma/client";
import { useState } from "react";

interface Props {
    projects: Project[];
}

export default function ProjectDashboard({ projects }: Props) {
    const [activeProjectID, setActiveProjectID] = useState<string | null>(projects[0]?.id || null);//sets the first project id
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const activeProject = projects.find(p => p.id == activeProjectID);
    return (
        <div className="min-h-screen flex justify-center py-20 ">
            <div className={"flex bg-neutral-900 rounded-lg"}>
                <aside className="w-64 pl-10 pt-20">
                    <h2 className="my-3 font-bold text-lg">Projects</h2>
                    <ul className="space-y-3">
                        {projects.map(p =>
                            <li key={p.id} onClick={() => setActiveProjectID(p.id)}
                                className={`cursor-pointer transition ${p.id === activeProjectID ? "font-semibold" : ""}`}>{p.name}</li>
                        )}
                    </ul>
                    <button onClick={() => setIsModalOpen(true)} className="bg-neutral-700 hover:bg-neutral-800 cursor-pointer rounded-lg p-2 mt-3 transition">+ New Project</button>
                </aside>
                <div className="mr-10 border-l border-neutral-700" />
                <main className="w-128 pt-20 ">
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

