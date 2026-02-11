# 🔐 Login Auth Frontend

A modern, responsive authentication interface built with **Next.js 14** and **Tailwind CSS**. This project features a premium "Cyber/Tech" aesthetic with smooth animations and secure integration with the backend API.

## 🚀 Live Demo
[https://login-auth-frontend-gules.vercel.app](https://login-auth-frontend-gules.vercel.app)

## ✨ Features
- **User Authentication**: Login and Signup forms with client-side validation.
- **OAuth Integration**: "Continue with Google" support.
- **Password Recovery**: Forgot Password and Reset Password flows.
- **Protected Routes**: Middleware to protect dashboard/profile pages.
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
- **Animations**: Custom CSS animations and transitions for a polished feel.

## 🛠️ Tech Stack
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
   *For production, update this to your deployed backend URL.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open locally:**
   Navigate to [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── login/        # Login page
│   ├── signup/       # Signup page
│   ├── forgot-password/ # Password recovery
│   └── ...
├── components/       # Reusable UI components (Buttons, Inputs, etc.)
├── lib/              # Utilities (API client, helpers)
└── styles/           # Global styles and tailwind config
```

## 🚢 Deployment
This project is optimized for deployment on **Vercel**.
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add the `NEXT_PUBLIC_API_URL` environment variable.
4. Deploy!