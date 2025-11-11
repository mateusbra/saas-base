import { getCurrentUser, signoutAction } from "@/services/userService";

export default async function Dashboard() {
    const user = await getCurrentUser();
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form action={signoutAction} className="p-8 rounded-xl bg-linear-to-br from-primary to-secondary flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <h1 className="text-xl font-bold">User id: {user?.id}</h1>
                <button className="bg-primary text-white p-2 rounded">Log out</button>
            </form>
        </div>
    )
}