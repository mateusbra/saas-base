'use client'
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

type DashboardProps = {
    user: User| null;
    signoutAction: () => Promise<void>;
}

export default function Dashboard({user,signoutAction}:DashboardProps) {
    const router = useRouter();
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-xl bg-linear-to-br from-primary to-secondary flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <h1 className="text-xl font-bold">User id: {user?.id}</h1>
                <button className="bg-primary text-white p-2 rounded" onClick={() => router.push("/projects")}>Projects</button>
                <form action={signoutAction}>
                    <button className="bg-primary text-white p-2 rounded">Log out</button>
                </form>
            </div>
        </div>
    )
}