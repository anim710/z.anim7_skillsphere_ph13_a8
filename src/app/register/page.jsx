"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faEye, faEyeSlash, faUser, faEnvelope, faLock, faImage } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authClient } from "@/src/lib/auth-client";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.image || undefined,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed. Try again.");
    } else {
      toast.success("Account created! Please login. 🎉");
      router.push("/login");
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-100 p-3 rounded-2xl mb-3">
            <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join SkillSphere today — it&apos;s free</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faUser} className="w-3 h-3" /> Full Name
              </span>
            </label>
            <input
              name="name" type="text"
              className="input input-bordered w-full"
              placeholder="John Doe"
              value={form.name} onChange={handleChange} required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3" /> Email Address
              </span>
            </label>
            <input
              name="email" type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faImage} className="w-3 h-3" /> Photo URL
                <span className="text-gray-400 font-normal">(optional)</span>
              </span>
            </label>
            <input
              name="image" type="url"
              className="input input-bordered w-full"
              placeholder="https://..."
              value={form.image} onChange={handleChange}
            />
            {form.image && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={form.image} alt="preview"
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <span className="text-xs text-gray-400">Preview</span>
              </div>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faLock} className="w-3 h-3" /> Password
              </span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="Min 8 characters"
                value={form.password} onChange={handleChange}
                required minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPass(!showPass)}
              >
                <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 my-4">OR CONTINUE WITH</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full gap-2">
          <FontAwesomeIcon icon={faGoogle} className="w-4 h-4 text-red-500" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}