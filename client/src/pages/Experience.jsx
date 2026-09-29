import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getExperiences } from "../services/experienceService";

// ==========================================
// Format date
// ==========================================
const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Load Experience
  // ==========================================
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getExperiences();

        setExperiences(response.experiences || []);
      } catch (error) {
        console.error(
          "Experience page error:",
          error
        );

        setError("Unable to load experience.");
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return <Loading />;
  }

  // ==========================================
  // Error
  // ==========================================
  if (error) {
    return (
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  // ==========================================
  // Experience Page
  // ==========================================
  return (
    <section className="bg-white px-4 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">

        {/* ======================================
            Header
        ====================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Career Journey
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Professional Experience
          </h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-400">
            A detailed overview of my professional experience,
            responsibilities, and technical expertise.
          </p>
        </motion.div>

        {/* ======================================
            Empty State
        ====================================== */}
        {experiences.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              No experience information is available yet.
            </p>
          </div>
        ) : (
          <div className="relative">

            {/* Main Timeline */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-slate-200 dark:bg-slate-800 sm:block" />

            <div className="space-y-10">

              {experiences.map(
                (experience, index) => (
                  <motion.article
                    key={
                      experience._id ||
                      `${experience.jobTitle}-${index}`
                    }
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="relative sm:pl-14"
                  >

                    {/* Timeline Point */}
                    <div
                      className="
                        absolute left-0 top-6
                        hidden h-10 w-10
                        items-center justify-center
                        rounded-full
                        border-4
                        border-white
                        bg-blue-600
                        text-white
                        shadow-md
                        dark:border-slate-950
                        sm:flex
                      "
                    >
                      <FaBriefcase />
                    </div>

                    {/* Card */}
                    <div
                      className="
                        overflow-hidden
                        rounded-2xl
                        border border-slate-200
                        bg-slate-50
                        shadow-sm
                        dark:border-slate-800
                        dark:bg-slate-900
                      "
                    >

                      {/* Card Header */}
                      <div className="p-6 sm:p-8">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                          <div>

                            {/* Job */}
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {experience.jobTitle}
                            </h2>

                            {/* Company */}
                            <p className="mt-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
                              {experience.company}
                            </p>

                          </div>

                          {/* Current Badge */}
                          {experience.isCurrent && (
                            <span
                              className="
                                inline-flex
                                w-fit
                                items-center
                                gap-2
                                rounded-full
                                bg-green-100
                                px-4 py-2
                                text-sm
                                font-semibold
                                text-green-700
                                dark:bg-green-950
                                dark:text-green-400
                              "
                            >
                              <FaCheckCircle />
                              Currently Working
                            </span>
                          )}

                        </div>

                        {/* Metadata */}
                        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">

                          {experience.employmentType && (
                            <span className="flex items-center gap-2">
                              <FaBriefcase className="text-blue-600" />
                              {experience.employmentType}
                            </span>
                          )}

                          {experience.location && (
                            <span className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-blue-600" />
                              {experience.location}
                            </span>
                          )}

                          <span className="flex items-center gap-2">
                            <FaCalendarAlt className="text-blue-600" />

                            {formatDate(
                              experience.startDate
                            )}

                            {" - "}

                            {experience.isCurrent
                              ? "Present"
                              : formatDate(
                                  experience.endDate
                                )}
                          </span>

                        </div>

                        {/* Description */}
                        <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
                          {experience.description}
                        </p>

                      </div>

                      {/* =================================
                          Responsibilities
                          ================================= */}
                      {experience.responsibilities?.length > 0 && (
                        <div className="border-t border-slate-200 p-6 dark:border-slate-800 sm:p-8">

                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Key Responsibilities
                          </h3>

                          <ul className="mt-5 space-y-3">

                            {experience.responsibilities.map(
                              (responsibility, itemIndex) => (
                                <li
                                  key={`${responsibility}-${itemIndex}`}
                                  className="flex gap-3 text-slate-600 dark:text-slate-400"
                                >
                                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />

                                  <span>
                                    {responsibility}
                                  </span>
                                </li>
                              )
                            )}

                          </ul>

                        </div>
                      )}

                      {/* =================================
                          Technologies
                          ================================= */}
                      {experience.technologies?.length > 0 && (
                        <div className="border-t border-slate-200 p-6 dark:border-slate-800 sm:p-8">

                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Technologies & Skills
                          </h3>

                          <div className="mt-4 flex flex-wrap gap-2">

                            {experience.technologies.map(
                              (technology, techIndex) => (
                                <span
                                  key={`${technology}-${techIndex}`}
                                  className="
                                    rounded-lg
                                    bg-blue-50
                                    px-3 py-2
                                    text-sm
                                    font-medium
                                    text-blue-700
                                    dark:bg-blue-950
                                    dark:text-blue-300
                                  "
                                >
                                  {technology}
                                </span>
                              )
                            )}

                          </div>

                        </div>
                      )}

                      {/* =================================
                          Company Website
                          ================================= */}
                      {experience.companyWebsite && (
                        <div className="border-t border-slate-200 p-6 dark:border-slate-800 sm:p-8">

                          <a
                            href={experience.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              font-semibold
                              text-blue-600
                              transition
                              hover:text-blue-700
                              dark:text-blue-400
                            "
                          >
                            Visit Company Website
                            <FaExternalLinkAlt className="text-sm" />
                          </a>

                        </div>
                      )}

                    </div>

                  </motion.article>
                )
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;