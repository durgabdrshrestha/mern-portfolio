import { useEffect, useState } from "react";

import {
  FaGraduationCap,
  FaUniversity,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGlobe,
  FaCheckCircle,
} from "react-icons/fa";

import { motion } from "framer-motion";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getEducations } from "../services/educationService";
import { resolveAssetUrl } from "../services/api";

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEducation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getEducations();

        setEducations(response.educations || []);
      } catch (error) {
        console.error("Education loading error:", error);

        setError("Unable to load education information.");
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, []);

  // Format date
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Format education period
  const getEducationPeriod = (education) => {
    const start = formatDate(education.startDate);

    if (education.isCurrent) {
      return `${start} - Present`;
    }

    if (education.endDate) {
      return `${start} - ${formatDate(education.endDate)}`;
    }

    return start;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  const activeEducations = educations.filter(
    (education) => education.isActive
  );

  return (
    <section className="min-h-screen bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <FaGraduationCap className="text-3xl" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            My Education
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            My academic background, qualifications, and educational journey.
          </p>
        </motion.div>

        {/* No Education */}
        {activeEducations.length === 0 ? (
          <div className="mx-auto max-w-2xl">
            <ErrorMessage message="No education records are currently available." />
          </div>
        ) : (
          <div className="relative mx-auto max-w-5xl">

            {/* Timeline Line */}
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-slate-200 dark:bg-slate-700 md:block" />

            <div className="space-y-10">
              {activeEducations.map((education, index) => (
                <motion.div
                  key={education._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative md:pl-16"
                >

                  {/* Timeline Icon */}
                  <div className="absolute left-0 top-6 hidden h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-md dark:border-slate-950 md:flex">
                    <FaGraduationCap />
                  </div>

                  {/* Card */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">

                    {/* Institution Image */}
                    {education.institutionImage && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={resolveAssetUrl(education.institutionImage)}
                          alt={education.institution}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-6 sm:p-8">

                      {/* Header */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                            {education.degree}
                          </h2>

                          <div className="mt-3 flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400">
                            <FaUniversity />

                            <span>
                              {education.institution}
                            </span>
                          </div>
                        </div>

                        {education.isCurrent && (
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                            <FaCheckCircle />
                            Currently Studying
                          </span>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="mt-6 flex flex-wrap gap-3">

                        {education.fieldOfStudy && (
                          <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {education.fieldOfStudy}
                          </span>
                        )}

                        {education.startDate && (
                          <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <FaCalendarAlt />

                            {getEducationPeriod(education)}
                          </span>
                        )}

                        {education.location && (
                          <span className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            <FaMapMarkerAlt />

                            {education.location}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {education.description && (
                        <div className="mt-7">
                          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
                            About My Education
                          </h3>

                          <p className="leading-8 text-slate-600 dark:text-slate-400">
                            {education.description}
                          </p>
                        </div>
                      )}

                      {/* Achievements */}
                      {education.achievements?.length > 0 && (
                        <div className="mt-7">
                          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                            Achievements & Highlights
                          </h3>

                          <div className="grid gap-3 sm:grid-cols-2">
                            {education.achievements.map(
                              (achievement, achievementIndex) => (
                                <div
                                  key={achievementIndex}
                                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
                                >
                                  <FaCheckCircle className="mt-1 shrink-0 text-blue-600 dark:text-blue-400" />

                                  <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                                    {achievement}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* Institution Website */}
                      {education.institutionWebsite && (
                        <div className="mt-7">
                          <a
                            href={education.institutionWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950"
                          >
                            <FaGlobe />
                            Visit Institution Website
                          </a>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;