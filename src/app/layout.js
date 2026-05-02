import { Geist } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
// import AuthProvider from "@/components/AuthProvider";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import AuthProvider from "../components/AuthProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "SkillSphere – Online Learning Platform",
  description: "Upgrade your skills with expert-led courses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}