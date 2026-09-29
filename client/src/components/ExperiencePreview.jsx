import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const ExperiencePreview = ({ experiences = [] }) => {
  const activeExperiences = experiences
    .filter((experience) => experience.isActive !== false)
    .slice(0, 3);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <SectionTitle
          eyebrow="Experience"
          title="My professional journey"
          description="A timeline of my professional experience, responsibilities, and technical growth."
        />

        {activeExperiences.length > 0 ? (
          <div className="relative">

            {/* Timeline Line */}
            <div className="absolute left-4 top-0 hidden h-full w-px bg-slate-300 md:block dark:bg-slate-700" />

            <div className="space-y-8">
              {activeExperiences.map((experience, index) => (
                <motion.div
                  key={experience._id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-6 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-slate-50 bg-blue-600 text-white md:flex dark:border-slate-900 dark:bg-blue-500">
                    <FaBriefcase className="text-xs" />
                  </div>

                  {/* Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {experience.jobTitle}
                          </h3>

                          {experience.isCurrent && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
                              Current
                            </span>
                          )}
                        </div>

                        <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">
                          {experience.company}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {experience.employmentType}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span>
                        {formatDate(experience.startDate)} –{" "}
                        {experience.isCurrent
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </span>

                      {experience.location && (
                        <span className="inline-flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {experience.location}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                      {experience.description}
                    </p>

                    {/* Technologies */}
                    {experience.technologies?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {experience.technologies.map((technology, techIndex) => (
                          <span
                            key={`${experience._id}-${techIndex}`}
                            className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          >
                            {technology}
                          </span>
                        ))}
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
              Professional experience will be displayed here.
            </p>
          </div>
        )}

        {/* View All */}
        {experiences.length > 3 && (
          <div className="mt-10 text-center">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View Full Experience
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperiencePreview;