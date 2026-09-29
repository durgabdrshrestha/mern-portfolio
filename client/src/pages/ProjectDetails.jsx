import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getProjectBySlug } from "../services/projectService";
import { resolveAssetUrl } from "../services/api";

const ProjectDetails = () => {
  // Get slug from URL
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      // Stop if there is no slug
      if (!slug) {
        setError("Project slug is missing.");
        setLoading(false);
        return;
      }

      try {
        console.log("Loading project with slug:", slug);

        setLoading(true);
        setError("");

        const response = await getProjectBySlug(slug);

        console.log("Project response:", response);

        if (response?.success && response?.project) {
          setProject(response.project);
        } else {
          setError("Project information was not found.");
        }
      } catch (error) {
        console.error("Project details error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load project information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  // Loading
  if (loading) {
    return <Loading />;
  }

  // Error
  if (error) {
    return (
      <section className="min-h-[70vh] px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <ErrorMessage message={error} />

          <Link
            to="/projects"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  // No project
  if (!project) {
    return (
      <section className="min-h-[70vh] px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Project Not Found
          </h1>

          <Link
            to="/projects"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/projects"
          className="mb-8 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {project.category}
          </p>

          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl dark:text-white">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {project.shortDescription}
          </p>
        </div>

        {/* Main Image */}
        {project.image && (
          <div className="mb-10 overflow-hidden rounded-2xl">
            <img
              src={resolveAssetUrl(project.image)}
              alt={project.title}
              className="h-auto max-h-[600px] w-full object-cover"
            />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Main Content */}
          <div className="space-y-10 lg:col-span-2">

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                About This Project
              </h2>

              <p className="mt-4 whitespace-pre-line leading-8 text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
            </div>

            {/* Features */}
            {project.features?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Key Features
                </h2>

                <ul className="mt-5 space-y-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <span className="text-blue-600 dark:text-blue-400">
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {project.challenges?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Development Challenges
                </h2>

                <ul className="mt-5 space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <span className="text-orange-500">
                        •
                      </span>

                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Project Information
              </h2>

              <div className="mt-6 space-y-4">

                <div>
                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {project.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Project Type
                  </p>

                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {project.projectType}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {project.status}
                  </p>
                </div>

              </div>
            </div>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Technologies
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((technology, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-3">

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  🌐 View Live Project
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                >
                  💻 View Source Code
                </a>
              )}

            </div>

          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;