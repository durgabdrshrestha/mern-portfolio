import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { resolveAssetUrl } from "../services/api";
import SectionTitle from "./SectionTitle";

const AboutPreview = ({ profile }) => {
  if (!profile) {
    return null;
  }

  const profileImage = profile.aboutImage || profile.profileImage || profile.image || "";

  return (
    <section id="about" className="bg-slate-50 py-20 dark:bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <SectionTitle
          eyebrow="About Me"
          title="A little about my journey"
          description="I combine practical IT support experience with modern full-stack development skills to build useful and reliable digital solutions."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex w-full justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 rounded-3xl bg-blue-600/10 blur-2xl dark:bg-blue-500/10" />

              {/* Image Card */}
              <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                {profileImage ? (
                  <img
                    src={resolveAssetUrl(profileImage)}
                    alt={profile.name || "Durga Shrestha"}
                    className="h-[420px] w-full rounded-2xl object-cover object-center sm:h-[520px]"
                  />
                ) : (
                  <div className="flex h-[420px] w-full items-center justify-center rounded-2xl bg-slate-100 text-6xl font-bold text-blue-600 sm:h-[520px] dark:bg-slate-800 dark:text-blue-400">
                    Durga Shrestha
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {profile.name || "Durga Bahadur Shrestha"}
            </p>

            <p className="mt-1 text-blue-600 dark:text-blue-400">
              {profile.title ||
                "MERN Stack Developer & IT Support Professional"}
            </p>

            <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base dark:text-slate-400">
              {profile.about ||
                profile.bio ||
                profile.shortBio ||
                "I am passionate about technology, web development and solving real-world IT problems."}
            </p>

            {/* Information Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {/* Location */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <FaMapMarkerAlt className="text-xl text-blue-600 dark:text-blue-400" />

                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                  Location
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {profile.location || "Nepal"}
                </p>
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <FaBriefcase className="text-xl text-blue-600 dark:text-blue-400" />

                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                  Experience
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {profile.experience || "5+ Years"}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <FaEnvelope className="text-xl text-blue-600 dark:text-blue-400" />

                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                  Contact
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-slate-900 dark:text-white">
                  Available
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                More About Me
                <FaArrowRight className="ml-2" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                <FaEnvelope className="mr-2" />
                Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
