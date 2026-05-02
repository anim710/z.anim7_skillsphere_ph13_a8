"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { authClient } from "@/src/lib/auth-client";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(({ data }) => setSession(data));
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setSession(null);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-purple-700">
          <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6" />
          SkillSphere
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-medium text-gray-600 hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link href="/courses" className="font-medium text-gray-600 hover:text-purple-600 transition-colors">
            Courses
          </Link>
          {session?.user && (
            <Link href="/my-profile" className="font-medium text-gray-600 hover:text-purple-600 transition-colors">
              My Profile
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-9 rounded-full ring-2 ring-purple-300">
                  <img
                    src={
                      session.user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name)}&background=7c3aed&color=fff`
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {session.user.name}
              </span>
              <button onClick={handleLogout} className="btn btn-sm btn-error btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-sm btn-outline btn-primary">Login</Link>
              <Link href="/register" className="btn btn-sm btn-primary">Register</Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="font-medium text-gray-700">Home</Link>
          <Link href="/courses" onClick={() => setMenuOpen(false)} className="font-medium text-gray-700">Courses</Link>
          {session?.user && (
            <Link href="/my-profile" onClick={() => setMenuOpen(false)} className="font-medium text-gray-700">
              My Profile
            </Link>
          )}
          <div className="border-t border-gray-100 pt-3">
            {session?.user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={
                          session.user.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name)}&background=7c3aed&color=fff`
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{session.user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-xs btn-error btn-outline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="btn btn-sm btn-outline btn-primary flex-1">Login</Link>
                <Link href="/register" className="btn btn-sm btn-primary flex-1">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}