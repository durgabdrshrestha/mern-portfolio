import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaFolderOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { resolveAssetUrl } from "../services/api";

const ProjectsPreview = ({ projects = [] }) => {
  const activeProjects = projects
    .filter((project) => project.isActive !== false)
    .slice(0, 6);

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <SectionTitle
          eyebrow="My Projects"
          title="Things I have built"
          description="A selection of web applications and software projects demonstrating my development, problem-solving, and technical skills."
        />

        {activeProjects.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950"
              >
                {/* Project Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {project.image ? (
                    <img
                      src={resolveAssetUrl(project.image)}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FaFolderOpen className="text-5xl text-slate-300 dark:text-slate-600" />
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.isFeatured && (
                    <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      Featured
                    </span>
                  )}

                  {/* Status */}
                  {project.status && (
                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow dark:bg-slate-950/90 dark:text-slate-200">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">

                  {/* Category */}
                  {project.category && (
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {project.category}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  {project.technologies?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map(
                        (technology, technologyIndex) => (
                          <span
                            key={`${project._id}-${technologyIndex}`}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {technology}
                          </span>
                        )
                      )}

                      {project.technologies.length > 5 && (
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-6 flex flex-wrap gap-2">

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        <FaExternalLinkAlt />
                        Live
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <FaGithub />
                        Source
                      </a>
                    )}

                    <Link
                      to={`/projects/${project.slug}`}
                      className="ml-auto inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950"
                    >
                      Details
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              Projects will be displayed here.
            </p>
          </div>
        )}

        {/* View All Projects */}
        {projects.length > 6 && (
          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View All Projects
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPreview;