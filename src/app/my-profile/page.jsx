"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPenToSquare, faCalendar, faShield, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { authClient } from "@/src/lib/auth-client";

export default function MyProfilePage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      setSession(data);
      setLoading(false);
      if (!data) router.push("/login");
    });
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) return null;
  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-28"></div>

          <div className="px-6 pb-6">
            {/* Avatar + Badge */}
            <div className="flex justify-between items-end -mt-12 mb-4">
              <div className="avatar">
                <div className="w-24 rounded-full ring-4 ring-white shadow-lg">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=7c3aed&color=fff&size=128`
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <span className="badge badge-primary badge-outline">SkillSphere Member</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>

            <div className="space-y-2 mt-3">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-purple-500" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FontAwesomeIcon icon={faCalendar} className="w-3.5 h-3.5 text-purple-500" />
                Member since{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric", month: "long",
                })}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <FontAwesomeIcon icon={faShield} className="w-3.5 h-3.5 text-green-500" />
                Account Active
              </div>
            </div>

            <div className="divider"></div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              {[
                { icon: faBookOpen, value: "0", label: "Enrolled" },
                { icon: faShield, value: "0", label: "Completed" },
                { icon: faShield, value: "0", label: "Certificates" },
              ].map((s, i) => (
                <div key={i} className="bg-purple-50 rounded-xl p-3">
                  <div className="text-xl font-bold text-purple-700">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/my-profile/update" className="btn btn-primary w-full gap-2">
              <FontAwesomeIcon icon={faPenToSquare} className="w-4 h-4" />
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}