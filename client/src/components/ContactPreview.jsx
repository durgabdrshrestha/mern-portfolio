import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaArrowRight,
  FaComments,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactPreview = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 dark:bg-black">
      {/* Decorative Background */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">

            {/* Content */}
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg">
                <FaEnvelope />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Let's Connect
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Have a project in mind?
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Whether you need a modern website, a full-stack application,
                technical support, or simply want to discuss an idea, feel
                free to get in touch.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
              >
                Contact Me
                <FaArrowRight />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                <FaComments />
                View My Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPreview;