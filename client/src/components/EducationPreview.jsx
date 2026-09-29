import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const EducationPreview = ({ educations = [] }) => {
  const activeEducations = educations
    .filter((education) => education.isActive !== false)
    .slice(0, 3);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <SectionTitle
          eyebrow="Education"
          title="My academic background"
          description="My education and continuous learning journey in computer applications and technology."
        />

        {activeEducations.length > 0 ? (
          <div className="relative">

            {/* Timeline Line */}
            <div className="absolute left-4 top-0 hidden h-full w-px bg-slate-300 md:block dark:bg-slate-700" />

            <div className="space-y-8">
              {activeEducations.map((education, index) => (
                <motion.div
                  key={education._id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative md:pl-12"
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-0 top-6 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white md:flex dark:border-slate-950 dark:bg-blue-500">
                    <FaGraduationCap className="text-sm" />
                  </div>

                  {/* Card */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {education.degree}
                        </h3>

                        <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">
                          {education.institution}
                        </p>
                      </div>

                      {education.isCurrent && (
                        <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                      {education.fieldOfStudy && (
                        <span>{education.fieldOfStudy}</span>
                      )}

                      <span>
                        {formatDate(education.startDate)} –{" "}
                        {education.isCurrent
                          ? "Present"
                          : formatDate(education.endDate)}
                      </span>

                      {education.location && (
                        <span className="inline-flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {education.location}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {education.description && (
                      <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                        {education.description}
                      </p>
                    )}

                    {/* Achievements */}
                    {education.achievements?.length > 0 && (
                      <div className="mt-5">
                        <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                          Key Areas
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {education.achievements.map(
                            (achievement, achievementIndex) => (
                              <span
                                key={`${education._id}-${achievementIndex}`}
                                className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              >
                                {achievement}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              Education information will be displayed here.
            </p>
          </div>
        )}

        {/* View All */}
        {educations.length > 3 && (
          <div className="mt-10 text-center">
            <Link
              to="/education"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View Full Education
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EducationPreview;