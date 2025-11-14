import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function AdminUsers() {
  const user = await requireAdmin(); 
  const users = await prisma.user.findMany();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border">
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
