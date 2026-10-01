import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import { sendContactMessage } from "../services/contactService";
import { getProfile } from "../services/profileService";

const Contact = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let active = true;
    getProfile()
      .then((response) => {
        if (active) setProfile(response?.profile || null);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  // =====================================================
  // FORM STATE
  // =====================================================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // =====================================================
  // UI STATE
  // =====================================================
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    // Clear old messages while typing
    setSuccessMessage("");
    setErrorMessage("");
  };

  // =====================================================
  // HANDLE FORM SUBMIT
  // =====================================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Frontend validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage(
        "Please fill in all fields before sending your message."
      );

      return;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");

      return;
    }

    try {
      setLoading(true);

      const response = await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSuccessMessage(
        response.message ||
          "Your message has been sent successfully."
      );

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      const serverMessage =
        error.response?.data?.message;

      setErrorMessage(
        serverMessage ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Contact
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Let's Work Together
          </h1>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
            Have a project, job opportunity, or question?
            Send me a message and I will get back to you.
          </p>
        </motion.div>

        {/* =================================================
            CONTACT CONTENT
        ================================================= */}
        <div className="grid gap-10 lg:grid-cols-3">

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-slate-700 dark:bg-slate-900">

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Get In Touch
              </h2>

              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                I am open to remote IT support opportunities,
                MERN Stack development projects, freelance work,
                and professional collaborations.
              </p>

              {/* Email */}
              <div className="mt-8 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Email
                  </p>

                  <a
                    href={`mailto:${profile?.email || "dbshrestha2051@gmail.com"}`}
                    className="break-all font-medium text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                  >
                    {profile?.email || "dbshrestha2051@gmail.com"}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Location
                  </p>

                  <p className="font-medium text-slate-900 dark:text-white">
                    {profile?.location || "Bhaktapur, Nepal"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              CONTACT FORM
          ================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8"
            >

              <div className="grid gap-6 sm:grid-cols-2">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mt-6">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Message */}
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
                  <FaCheckCircle className="mt-1 shrink-0" />

                  <p>{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
                  <FaExclamationCircle className="mt-1 shrink-0" />

                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;