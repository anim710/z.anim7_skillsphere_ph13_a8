import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen, faEnvelope, faPhone, faLocationDot,
  faFileContract, faShield
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub, faTwitter, faLinkedin, faFacebook
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1B2B49" }} className="text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          {/* Logo */}
           <Link href="/" className="flex items-center gap-2">
            <img
              src="/skillspheree.png"
              alt="SkillSphere Logo"
              className="h-10 w-auto object-contain"
            />
            <span style={{ fontWeight: "bold" , fontSize: "1rem" }}>SkillSphere</span> 
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Upgrade your skills with expert-led courses. Learn at your own pace, anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
            <li><Link href="/courses" className="hover:text-purple-400 transition-colors">All Courses</Link></li>
            <li><Link href="/login" className="hover:text-purple-400 transition-colors">Login</Link></li>
            <li><Link href="/register" className="hover:text-purple-400 transition-colors">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-{##0095D9}" />
              support@skillsphere.com
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-{##0095D9}" />
              +880 1234 56789
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5 text-{##0095D9}" />
              Dhaka City, Bangladesh
            </li>
          </ul>
        </div>

        {/* Legal + Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm mb-6">
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFileContract} className="w-3 h-3 text-{##0095D9}" />
              <a href="#" className="hover:text-{##0095D9} transition-colors">Terms & Conditions</a>
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faShield} className="w-3 h-3 text-{##0095D9}" />
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            </li>
          </ul>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © 2026 SkillSphere. All rights reserved. Built with Next.js & TailwindCSS.
      </div>
    </footer>
  );
}