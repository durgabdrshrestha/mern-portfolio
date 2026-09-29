import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaTools,
} from "react-icons/fa";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getSkills } from "../services/skillService";

// ==========================================
// Select icon based on skill category
// ==========================================
const getCategoryIcon = (category) => {
  const value = category?.toLowerCase() || "";

  if (
    value.includes("frontend") ||
    value.includes("front-end") ||
    value.includes("front end")
  ) {
    return <FaCode />;
  }

  if (
    value.includes("backend") ||
    value.includes("back-end") ||
    value.includes("back end")
  ) {
    return <FaServer />;
  }

  if (
    value.includes("database") ||
    value.includes("db")
  ) {
    return <FaDatabase />;
  }

  return <FaTools />;
};

const Skills = () => {
  // Skills from MongoDB
  const [skills, setSkills] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // ==========================================
  // Load skills
  // ==========================================
  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getSkills();

        setSkills(response.skills || []);
      } catch (error) {
        console.error("Skills page error:", error);

        setError("Unable to load skills.");
      } finally {
        // IMPORTANT:
        // Always stop loading
        setLoading(false);
      }
    };

    loadSkills();
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
  // Skills Page
  // ==========================================
  return (
    <section className="bg-white px-4 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            My Expertise
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Skills & Technologies
          </h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-400">
            Technologies and tools I use to build modern, responsive,
            and scalable web applications.
          </p>
        </motion.div>

        {/* Empty State */}
        {skills.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              No skills are available yet.
            </p>
          </div>
        ) : (
          /* Skills Grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {skills.map((skill, index) => (
              <motion.div
                key={skill._id || skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="
                  group rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  p-6
                  shadow-sm
                  transition duration-300
                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:shadow-lg
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:border-blue-700
                "
              >

                {/* Icon + Percentage */}
                <div className="flex items-center justify-between">

                  <div
                    className="
                      flex h-12 w-12
                      items-center justify-center
                      rounded-xl
                      bg-blue-100
                      text-xl
                      text-blue-600
                      transition
                      group-hover:scale-110
                      dark:bg-blue-950
                      dark:text-blue-400
                    "
                  >
                    {getCategoryIcon(skill.category)}
                  </div>

                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {skill.proficiency}%
                  </span>

                </div>

                {/* Skill Name */}
                <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {skill.name}
                </h2>

                {/* Category */}
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {skill.category}
                </p>

                {/* Progress Bar */}
                <div className="mt-5">

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          Math.max(skill.proficiency || 0, 0),
                          100
                        )}%`,
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1,
                      }}
                      className="h-full rounded-full bg-blue-600"
                    />

                  </div>

                </div>

              </motion.div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;