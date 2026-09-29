import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowUp,
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

import SocialLinks from "./SocialLinks";
import { getResume } from "../services/resumeService";
import { resolveAssetUrl } from "../services/api";

const Footer = () => {
  const [resume, setResume] = useState(null);

  // Get current year automatically
  const currentYear = new Date().getFullYear();

  // Load active resume
  useEffect(() => {
    const loadResume = async () => {
      try {
        const response = await getResume();

        if (response?.resume?.isActive !== false) {
          setResume(response.resume);
        }
      } catch (error) {
        // Resume is optional, so don't break the footer
        console.log("No active resume available.");
      }
    };

    loadResume();
  }, []);

  // Create complete resume URL
  const resumeUrl = resolveAssetUrl(resume?.url);

  // Back to top
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Quick navigation links
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">

      {/* =========================================================
          Contact CTA
      ========================================================= */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="overflow-hidden rounded-3xl bg-blue-600 px-6 py-10 shadow-xl shadow-blue-600/20 sm:px-10 lg:px-14">

            <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">

              <div className="max-w-2xl">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-100">
                  Let's Work Together
                </p>

                <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  Have a project or opportunity in mind?
                </h2>

                <p className="mt-3 text-sm leading-7 text-blue-100 sm:text-base">
                  I'm available for MERN Stack development, web applications,
                  remote IT support, and technical projects.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
              >
                <FaEnvelope className="mr-2" />
                Contact Me
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Main Footer
      ========================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

          {/* =====================================================
              Brand / About
          ===================================================== */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
                DS
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  DB_Shrestha
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  MERN Stack Developer
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              MERN Stack Developer and IT Support professional focused on
              building modern, responsive and practical web applications
              while solving real-world technical problems.
            </p>

            {/* Contact information */}
            <div className="mt-6 space-y-3 text-sm">

              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                <span>Bhaktapur,Nepal</span>
              </div>

              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                <Link
                  to="/contact"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact through website
                </Link>
              </div>

              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <FaPhoneAlt className="text-blue-600 dark:text-blue-400" />
                <Link
                  to="/contact"
                  className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Get in touch
                </Link>
              </div>

            </div>
          </div>

          {/* =====================================================
              Quick Links
          ===================================================== */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">

              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  {link.name}
                </Link>
              ))}

            </div>

            {/* Resume */}
            {resume?.downloadEnabled && resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950"
              >
                <FaDownload className="mr-2" />
                Download Resume
              </a>
            )}
          </div>

          {/* =====================================================
              Social / Professional Links
          ===================================================== */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Connect With Me
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Follow my development journey, projects and professional work
              through my social and developer profiles.
            </p>

            {/* Dynamic social links */}
            <div className="mt-6">
              <SocialLinks />
            </div>

            {/* Project CTA */}
            <Link
              to="/projects"
              className="mt-7 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Explore My Projects
              <span className="ml-2">→</span>
            </Link>
          </div>

        </div>

        {/* =========================================================
            Bottom Footer
        ========================================================= */}
        <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-left">
            © {currentYear}{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Durga Bahadur Shrestha
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-5">

            <Link
              to="/privacy"
              className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Privacy
            </Link>

            <Link
              to="/contact"
              className="text-sm text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Contact
            </Link>

            {/* Back to top */}
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-500 dark:hover:text-white"
            >
              <FaArrowUp />
            </button>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;