import { getCurrentUser, signoutAction } from "@/services/userService";
import Dashboard from "./Dashboard";


export default async function DashboardPage(){
    const user = await getCurrentUser();
    return(
        <Dashboard user={user} signoutAction={signoutAction} />
    );
}