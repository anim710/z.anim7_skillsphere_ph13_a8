"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser, faImage } from "@fortawesome/free-solid-svg-icons";

export default function UpdateProfilePage() {
  const [session, setSession] = useState(null);
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) { router.push("/login"); return; }
      setSession(data);
      setForm({ name: data.user.name || "", image: data.user.image || "" });
    });
  }, [router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.updateUser({
      name: form.name,
      image: form.image || undefined,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Update failed. Try again.");
    } else {
      toast.success("Profile updated successfully! ✅");
      router.push("/my-profile");
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-md mx-auto">

        <Link
          href="/my-profile"
          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-6 w-fit transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Avatar Preview */}
          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-20 rounded-full ring-4 ring-purple-200">
                <img
                  src={
                    form.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || "User")}&background=7c3aed&color=fff&size=128`
                  }
                  alt="preview"
                  onError={(e) =>
                    (e.target.src = `https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff`)
                  }
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Update Profile
          </h2>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-medium flex items-center gap-1">
                  <FontAwesomeIcon icon={faUser} className="w-3 h-3" /> Full Name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium flex items-center gap-1">
                  <FontAwesomeIcon icon={faImage} className="w-3 h-3" /> Photo URL
                </span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://example.com/photo.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste a direct link to your profile image
              </p>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Saving changes..." : "Update Information"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}