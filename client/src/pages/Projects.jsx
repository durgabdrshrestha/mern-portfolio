import { useEffect, useState } from "react";

import {
  FaCode,
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getProjects } from "../services/projectService";
import { resolveAssetUrl } from "../services/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjects();

        setProjects(response.projects || []);
      } catch (error) {
        console.error("Projects loading error:", error);

        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const activeProjects = projects.filter(
    (project) => project.isActive
  );

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
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

  return (
    <section className="min-h-screen bg-slate-50 py-20 dark:bg-slate-950">
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
              <FaCode className="text-3xl" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            My Projects
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Explore my full-stack development projects, experiments, and
            professional work.
          </p>
        </motion.div>

        {/* Empty State */}
        {activeProjects.length === 0 ? (
          <div className="mx-auto max-w-2xl">
            <ErrorMessage message="No projects are currently available." />
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {activeProjects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >

                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-slate-200 dark:from-blue-950 dark:to-slate-800">

                  {project.image ? (
                    <img
                      src={resolveAssetUrl(project.image)}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-blue-600 dark:text-blue-400">
                      <FaCode className="text-6xl" />

                      <span className="mt-3 font-medium">
                        {project.category || "Web Development"}
                      </span>
                    </div>
                  )}

                  {project.isFeatured && (
                    <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-900 shadow">
                      <FaStar />
                      Featured
                    </div>
                  )}

                  {project.status && (
                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow dark:bg-slate-900/90 dark:text-white">
                      {project.status}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">

                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {project.category}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {project.shortDescription}
                  </p>

                  {/* Project Type */}
                  {project.projectType && (
                    <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {project.projectType}
                    </span>
                  )}

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map(
                        (technology, technologyIndex) => (
                          <span
                            key={technologyIndex}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-400"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {/* Completion Date */}
                  {project.completionDate && (
                    <p className="mt-5 text-sm text-slate-500 dark:text-slate-500">
                      Completed: {formatDate(project.completionDate)}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">

                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Details
                      <FaArrowRight />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <FaGithub />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}

                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;