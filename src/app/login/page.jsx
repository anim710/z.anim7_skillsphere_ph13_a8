"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authClient } from "@/src/lib/auth-client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Login failed. Check your credentials.");
    } else {
      toast.success("Welcome back! 🎉");
      router.push(redirect);
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirect });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-purple-100 p-3 rounded-2xl mb-3">
            <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Login to your SkillSphere account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3" /> Email Address
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faLock} className="w-3 h-3" /> Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="input input-bordered w-full pr-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400 my-4">OR CONTINUE WITH</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full gap-2">
          <FontAwesomeIcon icon={faGoogle} className="w-4 h-4 text-red-500" />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-purple-600 font-semibold hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}