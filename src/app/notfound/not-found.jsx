import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-black text-purple-200 leading-none">404</div>
        <div className="text-6xl mt-2">😕</div>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary px-8">Back to Home</Link>
          <Link href="/courses" className="btn btn-outline btn-primary px-8">Browse Courses</Link>
        </div>
      </div>
    </div>
  );
}