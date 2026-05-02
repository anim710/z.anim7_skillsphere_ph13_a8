const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://skillsphere-api-w8tk.onrender.com";

export async function getCourses() {
  const res = await fetch(`${API_URL}/courses`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function getCourseById(id) {
  const res = await fetch(`${API_URL}/courses/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
}