# 🔐 SaaS Base – Authentication Starter with Next.js, Prisma & TailwindCSS

A modern authentication boilerplate built with **Next.js 15 (App Router)**, **Prisma**, and **TailwindCSS**.  
It includes **sign up**, **login**, **persistent sessions (JWT + cookies)**, and a **protected dashboard** showing the logged-in user’s information.

---

## 🚀 Features

- ✅ User registration (Sign Up)
- 🔑 Login with secure password hashing (bcrypt)
- 🍪 Persistent sessions using **JWT** and **cookies**
- 🧭 Middleware for route protection
- 📊 Authenticated dashboard displaying user data
- 🎨 Styled with **TailwindCSS**
- ⚡ Fully server-side with **Next.js Server Actions**

---

## 🛠️ Tech Stack

| Technology | Description |
|-------------|-------------|
| [Next.js 15](https://nextjs.org/) | React full-stack framework (App Router) |
| [Prisma](https://www.prisma.io/) | Type-safe ORM for database access |
| [SQLite](https://www.sqlite.org/) | Simple local database |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Password hashing |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | JWT generation and verification |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/saas-base.git
cd saas-base
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Configure environment variables

Create a .env file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key_here"
```
Then initialize the database:
```bash
npm run dev
```
Now visit 👉 http://localhost:3000
### 🧩 Project Structure
```pgsql
📦 app/
 ┣ 📂 login/          → Login & Signup pages
 ┣ 📂 dashboard/      → Protected dashboard page
 ┣ 📜 layout.tsx      → Root layout
 ┗ 📜 globals.css     → Global Tailwind styles
📂 lib/
 ┣ 📜 prisma.ts       → Prisma client instance
 ┣ 📜 jwt.ts          → JWT helper functions
📂 services/
 ┗ 📜 userService.ts  → Authentication logic (server actions)
📂 middleware/
 ┗ 📜 proxy.ts        → Middleware for auth validation
```
