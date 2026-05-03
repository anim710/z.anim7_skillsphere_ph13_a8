export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-500 mt-3 text-sm">Loading...</p>
      </div>
    </div>
  );
}