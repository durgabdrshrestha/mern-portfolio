import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { getProfile } from "../services/profileService";
import { resolveAssetUrl } from "../services/api";

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response?.profile || null);
      } catch {
        setProfile(null);
      }
    };

    loadProfile();
  }, []);

  const profileImage = resolveAssetUrl(profile?.aboutImage || profile?.profileImage);

  return (
    <section className="min-h-screen bg-white px-4 py-20 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Get to know me
          </p>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            About Me
          </h1>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-600" />
        </motion.div>


        {/* Main content */}
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">

              <div className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl border-2 border-blue-600" />

              <div className="relative h-80 w-72 overflow-hidden rounded-2xl bg-slate-200 shadow-xl dark:bg-slate-800 sm:h-96 sm:w-80">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={profile?.name || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-slate-400">
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : "DS"}
                  </div>
                )}
              </div>

            </div>
          </motion.div>


          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              I'm{" "}
              <span className="text-blue-600">
                {profile?.name || "Durga Bahadur Shrestha"}
              </span>
            </h2>

            <p className="mt-3 text-xl font-semibold text-blue-600">
              {profile?.title || "MERN Stack Developer"}
            </p>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
              {profile?.about ||
                "I am a passionate developer focused on building modern, responsive and scalable web applications using the MERN stack. I enjoy learning new technologies, solving real-world problems, and creating useful digital products."}
            </p>


            {/* Information */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <FaMapMarkerAlt className="text-blue-600" />

                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Location
                  </p>

                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {profile?.location || "Bhaktapur, Nepal"}
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <FaBriefcase className="text-blue-600" />

                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Profession
                  </p>

                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {profile?.title || "MERN Stack Developer"}
                  </p>
                </div>
              </div>


              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900 sm:col-span-2">
                <FaEnvelope className="text-blue-600" />

                <div>
                  <p className="text-xs uppercase text-slate-500">
                    Email
                  </p>

                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {profile?.email || "Available through my contact page"}
                  </p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;