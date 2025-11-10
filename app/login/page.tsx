export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="p-8 rounded-xl bg-linear-to-br from-primary to-secondary flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <label>Email</label>
                <input className="border p-2 rounded bg-transparent" placeholder="Email" type="email" />
                <label>Password</label>
                <input className="border p-2 rounded bg-transparent" placeholder="Password" type="password" />
                <button className="bg-primary text-white p-2 rounded" type="submit" >Login</button>
            </form>
        </div>
    )
}