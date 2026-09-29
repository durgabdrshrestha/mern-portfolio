import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaTools,
  FaMobileAlt,
  FaRobot,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const ServicesPreview = ({ services = [] }) => {
  const activeServices = services
    .filter((service) => service.isActive !== false)
    .slice(0, 6);

  const getIcon = (title = "") => {
    const value = title.toLowerCase();

    if (value.includes("mobile")) return <FaMobileAlt />;
    if (value.includes("ai")) return <FaRobot />;
    if (value.includes("support")) return <FaTools />;
    if (value.includes("website") || value.includes("web")) {
      return <FaGlobe />;
    }
    if (value.includes("backend") || value.includes("api")) {
      return <FaLaptopCode />;
    }

    return <FaCode />;
  };

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <SectionTitle
          eyebrow="Services"
          title="What I can help you with"
          description="Practical digital solutions ranging from modern web applications to technical support and automation."
        />

        {activeServices.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Decorative Background */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100 opacity-50 transition group-hover:scale-150 dark:bg-blue-950" />

                {/* Icon */}
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg transition duration-300 group-hover:scale-110 dark:bg-blue-500">
                  {getIcon(service.title || service.name)}
                </div>

                {/* Title */}
                <h3 className="relative text-xl font-bold text-slate-900 dark:text-white">
                  {service.title || service.name}
                </h3>

                {/* Description */}
                <p className="relative mt-3 line-clamp-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>

                {/* Service Category */}
                {service.category && (
                  <div className="relative mt-5">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {service.category}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              Services will be displayed here.
            </p>
          </div>
        )}

        {/* View All */}
        {services.length > 6 && (
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View All Services
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesPreview;