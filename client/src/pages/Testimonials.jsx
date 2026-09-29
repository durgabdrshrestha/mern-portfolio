import { useEffect, useState } from "react";
import {
  FaStar,
  FaQuoteLeft,
  FaUser,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getTestimonials } from "../services/testimonialService";
import { resolveAssetUrl } from "../services/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTestimonials();

        setTestimonials(response.testimonials || []);
      } catch (error) {
        console.error("Testimonials loading error:", error);

        setError("Unable to load testimonials.");
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Testimonials
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            What People Say
          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Feedback and experiences from people I have worked with.
          </p>
        </motion.div>

        {/* Empty State */}
        {testimonials.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-slate-600 dark:text-slate-400">
              No testimonials available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >
                {/* Featured Badge */}
                {testimonial.isFeatured && (
                  <span className="absolute right-5 top-5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">
                    Featured
                  </span>
                )}

                {/* Quote Icon */}
                <div className="mb-5 text-3xl text-blue-200 dark:text-slate-700">
                  <FaQuoteLeft />
                </div>

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    {testimonial.image ? (
                      <img
                        src={resolveAssetUrl(testimonial.image)}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-2xl" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h2>

                    {testimonial.role && (
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </p>
                    )}

                    {testimonial.company && (
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={
                        starIndex < testimonial.rating
                          ? "text-yellow-400"
                          : "text-slate-300 dark:text-slate-700"
                      }
                    />
                  ))}

                  <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {testimonial.rating}/5
                  </span>
                </div>

                {/* Message */}
                <div className="mt-6 flex-1">
                  <p className="leading-8 text-slate-600 dark:text-slate-300">
                    "{testimonial.message}"
                  </p>
                </div>

                {/* Bottom Information */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">
                  {testimonial.relationship && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      {testimonial.relationship}
                    </span>
                  )}

                  {testimonial.website && (
                    <a
                      href={testimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      Website
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;