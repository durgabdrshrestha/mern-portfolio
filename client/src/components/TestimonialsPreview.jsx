import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { resolveAssetUrl } from "../services/api";

const TestimonialsPreview = ({ testimonials = [] }) => {
  const activeTestimonials = testimonials
    .filter((testimonial) => testimonial.isActive !== false)
    .slice(0, 3);

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <SectionTitle
          eyebrow="Testimonials"
          title="What people say about my work"
          description="Feedback from colleagues, clients, and people I have worked with."
        />

        {activeTestimonials.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {activeTestimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Quote Icon */}
                <div className="absolute right-6 top-6 text-4xl text-blue-100 dark:text-blue-950">
                  <FaQuoteLeft />
                </div>

                {/* Profile */}
                <div className="relative flex items-center gap-4">
                  {testimonial.image ? (
                    <img
                      src={resolveAssetUrl(testimonial.image)}
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-full object-cover ring-4 ring-white dark:ring-slate-800"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-white dark:bg-blue-950 dark:text-blue-400 dark:ring-slate-800">
                      <FaUser />
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </h3>

                    {(testimonial.role || testimonial.company) && (
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {testimonial.role}
                        {testimonial.role && testimonial.company
                          ? " · "
                          : ""}
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-5 flex items-center gap-1">
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
                </div>

                {/* Message */}
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  “{testimonial.message}”
                </p>

                {/* Relationship */}
                {testimonial.relationship && (
                  <div className="mt-5">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {testimonial.relationship}
                    </span>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              Testimonials will be displayed here.
            </p>
          </div>
        )}

        {/* View All */}
        {testimonials.length > 3 && (
          <div className="mt-10 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View All Testimonials
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsPreview;