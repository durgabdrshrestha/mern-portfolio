import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { resolveAssetUrl } from "../services/api";

const TypewriterRole = ({ roles }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentRole = roles[roleIndex] || roles[0] || "MERN Stack Developer";
  const article = /^[aeiou]/i.test(currentRole) ? "an" : "a";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion || roles.length < 2) {
      return undefined;
    }

    let timeoutId;

    if (isDeleting && characterCount > 0) {
      timeoutId = window.setTimeout(() => setCharacterCount((count) => count - 1), 35);
    } else if (isDeleting) {
      timeoutId = window.setTimeout(() => {
        setRoleIndex((index) => (index + 1) % roles.length);
        setIsDeleting(false);
      }, 250);
    } else if (characterCount < currentRole.length) {
      timeoutId = window.setTimeout(() => setCharacterCount((count) => count + 1), 80);
    } else {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1400);
    }

    return () => window.clearTimeout(timeoutId);
  }, [characterCount, currentRole, isDeleting, prefersReducedMotion, roles]);

  return (
    <>
      <span>I am {article} </span>
      <span aria-hidden="true">
        {prefersReducedMotion ? currentRole : currentRole.slice(0, characterCount)}
      </span>
      <span className="sr-only">{currentRole}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block h-6 border-r-2 border-blue-600 align-middle" />
    </>
  );
};

const Hero = ({ profile, resume }) => {
  const resumeUrl = resolveAssetUrl(resume?.url);
  const roleTitles = (profile?.title || "MERN Stack Developer | IT Support Technician")
    .split("|")
    .map((title) => title.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:py-20 md:py-28">
      {/* Background decorative effects */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto grid min-w-0 max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-12">
        {/* =====================================================
            PROFILE PHOTO
            Mobile  : Appears FIRST / TOP
            Desktop : Appears RIGHT SIDE
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-1 flex min-w-0 justify-center md:order-2 md:justify-end"
        >
          <div className="relative">
            {/* Glow behind photo */}
            <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-2xl" />

            {/* Photo container */}
            <div
              className="
                relative
                h-56
                w-56
                overflow-hidden
                rounded-full
                border-8
                border-white
                shadow-2xl
                dark:border-slate-800

                sm:h-72
                sm:w-72

                md:h-80
                md:w-80
              "
            >
              {profile?.homeImage || profile?.profileImage ? (
                <img
                  src={resolveAssetUrl(profile.homeImage || profile.profileImage)}
                  alt={profile.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-200 text-6xl font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  DS
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            HERO CONTENT
            Mobile  : Appears BELOW PHOTO
            Desktop : Appears LEFT SIDE
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 min-w-0 text-center md:order-1 md:text-left"
        >
          {/* Welcome text */}
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Welcome to my portfolio
          </p>

          {/* Name */}
          <h1
            className="
              text-4xl
              font-bold
              leading-tight
              text-slate-900
              dark:text-white

              sm:text-5xl

              lg:text-6xl
              max-w-full
              wrap-break-word
            "
          >
            Hello, I'm{" "}
            <span className="text-blue-600">
              {profile?.name || "Durga Shrestha"}
            </span>
          </h1>

          {/* Job title */}
          <h2
            className="
              mt-5
              min-h-14
              min-w-0
              text-xl
              font-semibold
              text-slate-700
              dark:text-slate-300

              sm:min-h-16
              sm:text-2xl
            "
          >
            <TypewriterRole key={roleTitles.join("|")} roles={roleTitles} />
          </h2>

          {/* Short bio */}
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-slate-600
              dark:text-slate-400

              sm:text-lg

              md:mx-0
            "
          >
            {profile?.shortBio ||
              "I build modern, responsive and scalable web applications using the MERN stack."}
          </p>

          {/* Available for work */}
          {profile?.availableForWork && (
            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-green-200
                bg-green-50
                px-4
                py-2
                text-sm
                font-medium
                text-green-700

                dark:border-green-900
                dark:bg-green-950
                dark:text-green-400
              "
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              Available for work
            </div>
          )}

          {/* Buttons */}
          <div
            className="
              mt-8
              flex
              flex-wrap
              justify-center
              gap-4

              md:justify-start
            "
          >
            {/* View My Work */}
            <Link
              to="/projects"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              View My Work
              <FaArrowRight />
            </Link>

            {/* About Me */}
            {/* <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              About Me
              <FaArrowRight />
            </Link>  */}

            {/* Download Resume */}
            {resume?.downloadEnabled && resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-blue-700
                "
              >
                <FaDownload />
                Download Resume
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
