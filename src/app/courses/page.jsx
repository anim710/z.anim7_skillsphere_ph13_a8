"use client";
import { useState, useEffect } from "react";
// import { getCourses } from "@lib";
// import CourseCard from "@/components/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CourseCard from "@/src/components/coursecard/CourseCard";
import { getCourses } from "@/src/lib/api";

const CATEGORIES = ["All", "Development", "Design", "Marketing", "Data Science", "Photography"];

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then((data) => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || c.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">All Courses</h1>
        <p className="text-gray-500">
          Explore our full library of {courses.length}+ expert-led courses
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-6">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <input
          type="text"
          className="input input-bordered w-full pl-11 pr-4"
          placeholder="Search courses by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn btn-sm rounded-full ${
              activeCategory === cat ? "btn-primary" : "btn-outline btn-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-500">No courses found for &quot;{search}&quot;</p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("All"); }}
            className="btn btn-primary btn-sm mt-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}