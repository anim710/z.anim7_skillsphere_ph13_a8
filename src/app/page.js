"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
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

// Import Lottie dynamically to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import learningAnimation from "./learning.json";
import skillslearnAnimation from "./skill-learning.json";
import delelopingAnimation from "./Developing.json";

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

      {/* ── Hero Slider with Lottie ── */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {/* Slide 1 — Lottie Animation slide */}
        <SwiperSlide>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white min-h-[500px] flex items-center">
            <div className="max-w-6xl mx-auto px-6 py-10 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left text */}
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
                    🎓 #1 Online Learning Platform
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Upgrade Your <br />
                    <span className="text-yellow-300">Skills Today</span> 🚀
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    Learn from Industry Experts at your own pace
                  </p>
                  <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                    <Link
                      href="/courses"
                      className="btn bg-white text-purple-700 font-bold border-0 hover:bg-gray-100 px-8"
                    >
                      Browse Courses
                    </Link>
                    <Link
                      href="/register"
                      className="btn btn-outline border-white text-white hover:bg-white hover:text-purple-700 px-8"
                    >
                      Join Free
                    </Link>
                  </div>
                </div>

                {/* Right Lottie animation */}
                <div className="flex-1 flex justify-center">
                  <Lottie
                    animationData={learningAnimation}
                    loop={true}
                    className="w-full max-w-sm md:max-w-md"
                  />
                </div>

              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white min-h-[500px] flex items-center">
            <div className="max-w-6xl mx-auto px-6 py-10 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
                    💡 Expert-led Courses
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Master <br />
                    <span className="text-yellow-300">In-Demand Skills</span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    Join 50,000+ learners worldwide
                  </p>
                  <Link
                    href="/register"
                    className="btn bg-white text-teal-700 font-bold border-0 hover:bg-gray-100 px-8"
                  >
                    Join for Free
                  </Link>
                </div>

                <div className="flex-1 flex justify-center">
                  <Lottie
                    animationData={skillslearnAnimation}
                    loop={true}
                    className="w-full max-w-sm md:max-w-md"
                  />
                </div>

              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="bg-gradient-to-r from-orange-500 to-rose-600 text-white min-h-[500px] flex items-center">
            <div className="max-w-6xl mx-auto px-6 py-10 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
                    🏆 Learn & Grow
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Learn. Build. <br />
                    <span className="text-yellow-300">Succeed.</span>
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    Expert-curated courses for every level
                  </p>
                  <Link
                    href="/courses"
                    className="btn bg-white text-orange-700 font-bold border-0 hover:bg-gray-100 px-8"
                  >
                    Explore Now
                  </Link>
                </div>

                <div className="flex-1 flex justify-center">
                  <Lottie
                    animationData={delelopingAnimation}
                    loop={true}
                    className="w-full max-w-sm md:max-w-md"
                  />
                </div>

              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Stats Bar */}
                <div className="text-white py-6" style={{ backgroundColor: "#003366" }}>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { icon: faUsers, value: "50K+", label: "Students" },
                { icon: faGraduationCap, value: "100+", label: "Courses" },
                { icon: faTrophy, value: "30+", label: "Instructors" },
                { icon: faStar, value: "4.8★", label: "Avg Rating" },
              ].map((s, i) => (
                <div key={i}>
                  <FontAwesomeIcon icon={s.icon} className="w-5 h-5 mb-1" style={{ color: "#A3C1DA" }} />
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-sm" style={{ color: "#A3C1DA" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

      {/* Popular Courses */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              <img 
                src="/icons8-fire-48.gif"
                alt="Popular"
                className="w-10 h-10"
              />
              Popular Courses</h2>
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
      <section className="py-16" style={{ backgroundColor: "#A3C1DA" + "33" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                <img 
                src="/icons8-improvement-48.gif"
                alt="trending"
                className="w-10 h-10"
              />
              Trending Courses</h2>
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
                  <div className="flex flex-col items-center">
          <img
            src="/icons8-prize-48.gif"
            alt="top"
            className="w-12 h-12 mb-2"
          />

          <h2 className="text-3xl font-bold text-gray-800">
            Top Instructors
          </h2>
        </div>
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
              <p className="text-xs text-dark-blue font-medium">{inst.role}</p>
              <p className="text-xs text-gray-400 mt-1">{inst.students} students</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Tips */}
      <section className="py-16" style={{ backgroundColor: "#f0f6fb" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            
                            <div className="flex flex-col items-center">
                  <img
                    src="/icons8-bulb.gif"
                    alt="top"
                    className="w-12 h-12 mb-2"
                  />

                  <h2 className="text-3xl font-bold text-gray-800">
                    Learning Tips
                  </h2>
                </div>
              
            <p className="text-gray-500 mt-1">Study smarter, not harder</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                <div className="bg-dark-blue w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={tip.icon} className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative text-white py-24 overflow-hidden">

          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/cta-bg.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 z-10" style={{ backgroundColor: "#003366CC" }}></div>

          {/* Content */}
          <div className="relative z-20 max-w-3xl mx-auto px-4 text-center">
            <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
              🎓 Start Your Journey Today
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-purple-200 mb-8 text-lg">
              Join thousands of learners already upgrading their skills on SkillSphere.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/register"
                className="btn bg-white text-dark-blue font-bold border-0 hover:bg-gray-100 px-8 btn-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/courses"
                className="btn btn-outline border-white text-white hover:bg-dark-blue cta-btn-browse px-8 btn-lg"
              >
                Browse Courses
              </Link>
            </div>
          </div>

        </section>

    </div>
  );
}