import { Unbounded, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ['400', '700'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: "Premium Auth - Login & Signup",
  description: "Secure and beautiful authentication experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${plusJakarta.variable} font-body bg-black text-white min-h-screen relative`}
      >
        <div className="bg-mesh" />
        {children}
      </body>
    </html>
  );
}
