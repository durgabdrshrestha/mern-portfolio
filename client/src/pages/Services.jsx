import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaTools,
  FaMobileAlt,
  FaRobot,
  FaGlobe,
} from "react-icons/fa";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getServices } from "../services/serviceService";

// ==========================================
// Get icon for service
// ==========================================
const getServiceIcon = (service) => {
  const value = `${service?.title || ""} ${
    service?.category || ""
  }`.toLowerCase();

  if (
    value.includes("mern") ||
    value.includes("web") ||
    value.includes("development")
  ) {
    return <FaCode />;
  }

  if (
    value.includes("it support") ||
    value.includes("support") ||
    value.includes("technical")
  ) {
    return <FaTools />;
  }

  if (
    value.includes("mobile") ||
    value.includes("responsive")
  ) {
    return <FaMobileAlt />;
  }

  if (
    value.includes("ai") ||
    value.includes("artificial intelligence")
  ) {
    return <FaRobot />;
  }

  if (
    value.includes("frontend") ||
    value.includes("website")
  ) {
    return <FaLaptopCode />;
  }

  return <FaGlobe />;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Load services from backend
  // ==========================================
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServices();

        setServices(response.services || []);
      } catch (error) {
        console.error("Services page error:", error);

        setError("Unable to load services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
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
  // Services Page
  // ==========================================
  return (
    <section className="bg-white px-4 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        {/* ======================================
            Header
        ====================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            What I Do
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            My Services
          </h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-400">
            Professional technology services focused on
            modern web applications, responsive interfaces,
            and practical IT solutions.
          </p>
        </motion.div>

        {/* ======================================
            Services
        ====================================== */}
        {services.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              No services are available yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service, index) => (
              <motion.div
                key={service._id || service.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="
                  group rounded-2xl
                  border border-slate-200
                  bg-slate-50
                  p-7
                  shadow-sm
                  transition duration-300
                  hover:-translate-y-2
                  hover:border-blue-300
                  hover:shadow-xl
                  dark:border-slate-800
                  dark:bg-slate-900
                  dark:hover:border-blue-700
                "
              >

                {/* Icon */}
                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-2xl
                    bg-blue-100
                    text-2xl
                    text-blue-600
                    transition duration-300
                    group-hover:scale-110
                    group-hover:rotate-3
                    dark:bg-blue-950
                    dark:text-blue-400
                  "
                >
                  {getServiceIcon(service)}
                </div>

                {/* Title */}
                <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h2>

                {/* Category */}
                {service.category && (
                  <p className="mt-2 font-medium text-blue-600 dark:text-blue-400">
                    {service.category}
                  </p>
                )}

                {/* Description */}
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>

              </motion.div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default Services;