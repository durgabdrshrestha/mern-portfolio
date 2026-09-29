import { motion } from "framer-motion";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const SkillsPreview = ({ skills = [] }) => {
  const activeSkills = skills
    .filter((skill) => skill.isActive !== false)
    .slice(0, 6);

  const getIcon = (category = "") => {
    const value = category.toLowerCase();

    if (
      value.includes("frontend") ||
      value.includes("front-end") ||
      value.includes("web")
    ) {
      return <FaCode />;
    }

    if (
      value.includes("backend") ||
      value.includes("back-end") ||
      value.includes("server")
    ) {
      return <FaServer />;
    }

    if (value.includes("database")) {
      return <FaDatabase />;
    }

    return <FaTools />;
  };

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <SectionTitle
          eyebrow="My Skills"
          title="Technologies I work with"
          description="A growing set of technologies and tools I use for web development, backend systems, databases, and IT support."
        />

        {activeSkills.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
              >
                {/* Icon + Category */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600 transition group-hover:scale-110 dark:bg-blue-950 dark:text-blue-400">
                    {getIcon(skill.category)}
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {skill.name}
                </h3>

                {/* Progress Header */}
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    Proficiency
                  </span>

                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1,
                      delay: 0.2 + index * 0.08,
                    }}
                    className="h-full rounded-full bg-blue-600 dark:bg-blue-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              Skills will be displayed here.
            </p>
          </div>
        )}

        {/* View All Skills */}
        {skills.length > 6 && (
          <div className="mt-10 text-center">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View All Skills
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsPreview;