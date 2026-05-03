"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import CourseCard from "@/components/CourseCard";
// import { getCourses } from "@/lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock, faBullseye, faBook, faLightbulb,
  faUsers, faStar, faGraduationCap, faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { getCourses } from "@/src/lib/api";
import CourseCard from "@/src/components/coursecard/CourseCard";

const banners = [
  {
    title: "Upgrade Your Skills Today 🚀",
    subtitle: "Learn from Industry Experts",
    bg: "from-purple-600 to-indigo-700",
    href: "/courses",
    cta: "Browse Courses",
  },
  {
    title: "Master In-Demand Skills 💡",
    subtitle: "Join 50,000+ learners worldwide",
    bg: "from-teal-500 to-cyan-600",
    href: "/register",
    cta: "Join for Free",
  },
  {
    title: "Learn. Build. Succeed. 🏆",
    subtitle: "Expert-curated courses for every level",
    bg: "from-orange-500 to-rose-600",
    href: "/courses",
    cta: "Explore Now",
  },
];

const instructors = [
  { name: "John Doe", role: "Web Development", students: "12.4K", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Dr. Alice Chen", role: "Data Science", students: "15.7K", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Sarah Kim", role: "UI/UX Design", students: "8.9K", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Carlos Rivera", role: "Mobile Dev", students: "5.4K", img: "https://randomuser.me/api/portraits/men/75.jpg" },
];

const tips = [
  { icon: faClock, title: "Schedule Study Time", desc: "Dedicate 1–2 hours daily. Consistency beats cramming every time." },
  { icon: faBullseye, title: "Set Clear Goals", desc: "Break big topics into weekly targets to stay on track." },
  { icon: faBook, title: "Take Notes Actively", desc: "Writing key ideas in your own words boosts retention by 40%." },
  { icon: faLightbulb, title: "Practice Daily", desc: "Apply what you learn through mini projects and exercises." },
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then((data) => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const topCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const trendingCourses = [...courses].sort((a, b) => b.students - a.students).slice(0, 3);

  return (
    <div>
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {banners.map((b, i) => (
          <SwiperSlide key={i}>
            <div className={`bg-gradient-to-r ${b.bg} text-white min-h-[420px] flex items-center`}>
              <div className="max-w-4xl mx-auto px-6 py-20 text-center w-full">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {b.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">{b.subtitle}</p>
                <Link
                  href={b.href}
                  className="btn bg-white text-purple-700 font-bold px-10 border-0 hover:bg-gray-100 btn-lg"
                >
                  {b.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats Bar */}
      <div className="bg-purple-700 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: faUsers, value: "50K+", label: "Students" },
            { icon: faGraduationCap, value: "100+", label: "Courses" },
            { icon: faTrophy, value: "30+", label: "Instructors" },
            { icon: faStar, value: "4.8★", label: "Avg Rating" },
          ].map((s, i) => (
            <div key={i}>
              <FontAwesomeIcon icon={s.icon} className="w-5 h-5 mb-1 text-purple-300" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-purple-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Courses */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">🔥 Popular Courses</h2>
            <p className="text-gray-500 mt-1">Top-rated picks by our learners</p>
          </div>
          <Link href="/courses" className="btn btn-outline btn-primary btn-sm">View All</Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        )}
      </section>

      {/* Trending Courses */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">📈 Trending Courses</h2>
              <p className="text-gray-500 mt-1">What students are enrolling in right now</p>
            </div>
            <Link href="/courses" className="btn btn-outline btn-primary btn-sm">View All</Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingCourses.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
          )}
        </div>
      </section>

      {/* Top Instructors */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">🏆 Top Instructors</h2>
          <p className="text-gray-500 mt-1">Learn from the best in the industry</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {instructors.map((inst, i) => (
            <div key={i} className="card bg-base-100 shadow-md text-center p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="avatar mx-auto mb-3">
                <div className="w-20 rounded-full ring-4 ring-purple-100">
                  <img src={inst.img} alt={inst.name} />
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">{inst.name}</h3>
              <p className="text-xs text-purple-600 font-medium">{inst.role}</p>
              <p className="text-xs text-gray-400 mt-1">{inst.students} students</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Tips */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">💡 Learning Tips</h2>
            <p className="text-gray-500 mt-1">Study smarter, not harder</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={tip.icon} className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-purple-200 mb-8 text-lg">
            Join thousands of learners already upgrading their skills on SkillSphere.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register" className="btn bg-white text-purple-700 font-bold border-0 hover:bg-gray-100 px-8">
              Get Started Free
            </Link>
            <Link href="/courses" className="btn btn-outline border-white text-white hover:bg-white hover:text-purple-700 px-8">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}