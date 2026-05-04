import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function CourseCard({ course }) {
  return (
    <div className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group animate__animated animate__fadeInUp border border-gray-100">
      <figure className="overflow-hidden h-48">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-2">
          <span
            className="badge badge-outline text-xs font-medium"
            style={{ borderColor: "#0095D9", color: "#0095D9" }}
          >
            {course.category}
          </span>
          <span className="badge badge-ghost badge-xs">{course.level}</span>
        </div>

        <h2 className="card-title text-sm font-bold leading-snug mt-1 line-clamp-2" style={{ color: "#1B2B49" }}>
          {course.title}
        </h2>

        <p className="text-xs text-gray-500">by {course.instructor}</p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3" style={{ color: "#007BB8" }} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUsers} className="w-3 h-3" style={{ color: "#007BB8" }} />
            {course.students?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
          <span className="text-sm font-semibold" style={{ color: "#1B2B49" }}>{course.rating}</span>
        </div>

        <div className="card-actions mt-3">
          <Link
            href={`/courses/${course.id}`}
            className="btn btn-sm w-full text-white border-0 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#0095D9" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}