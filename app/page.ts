import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = (await cookies()).get("session")?.value;

  if (token) {
    const user = verifyToken(token);
    if (user) {
      console.log("user logged, redirecting to /dashboard");
      redirect("/dashboard"); // user logged
    }
  }

  // user not logged
  console.log("user not logged, redirecting to /login");
  redirect("/login");
}
