"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// import { getCourseById } from "@/lib/api";
// import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar, faClock, faUsers, faCircleCheck,
  faArrowLeft, faBookOpen, faAward, faMobileScreen,
  faInfinity, faCertificate
} from "@fortawesome/free-solid-svg-icons";
import { getCourseById } from "@/src/lib/api";
import { authClient } from "@/src/lib/auth-client";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (!data) {
        router.push(`/login?redirect=/courses/${id}`);
        return;
      }
      getCourseById(id)
        .then((c) => { setCourse(c); setLoading(false); })
        .catch(() => setLoading(false));
    });
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
          <Link href="/courses" className="btn btn-primary mt-4">Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-10">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-purple-200 hover:text-white mb-4 w-fit transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Courses
          </Link>
          <span className="badge bg-purple-500 text-white border-0 mb-3">
            {course.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
          <p className="text-purple-200 text-lg mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="w-3.5 h-3.5 text-yellow-300" />
              <strong>{course.rating}</strong> rating
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" />
              {course.students?.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faAward} className="w-3.5 h-3.5" />
              {course.level}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Curriculum */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5 text-purple-600" />
                Course Curriculum
              </h2>
              <ul className="space-y-3">
                {course.curriculum?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700 p-3 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>{item}</span>
                    <span className="ml-auto text-xs text-gray-400">Lesson {i + 1}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">What You Will Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.curriculum?.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enroll Card */}
          <div className="md:col-span-1">
            <div className="card shadow-xl bg-white sticky top-20">
              <figure>
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-purple-700">${course.price}</p>
                  <span className="badge badge-success">Bestseller</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Instructor: <span className="font-medium text-gray-700">{course.instructor}</span>
                </p>
                <button className="btn btn-primary w-full mb-2">Enroll Now</button>
                <button className="btn btn-outline w-full">Add to Wishlist</button>
                <div className="divider text-xs text-gray-400">Includes</div>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-purple-500" />
                    {course.duration} of content
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCertificate} className="w-3 h-3 text-purple-500" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faInfinity} className="w-3 h-3 text-purple-500" />
                    Full lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMobileScreen} className="w-3 h-3 text-purple-500" />
                    Access on mobile & desktop
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}