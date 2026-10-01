import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaHome,
  FaUser,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaProjectDiagram,
  FaQuoteLeft,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;

    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Close mobile menu after clicking a navigation link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Navigation items
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      name: "About",
      path: "/about",
      icon: FaUser,
    },
    {
      name: "Skills",
      path: "/skills",
      icon: FaCode,
    },
    {
      name: "Services",
      path: "/services",
      icon: FaBriefcase,
    },
    {
      name: "Experience",
      path: "/experience",
      icon: FaBriefcase,
    },
    {
      name: "Education",
      path: "/education",
      icon: FaGraduationCap,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FaProjectDiagram,
    },
    {
      name: "Testimonials",
      path: "/testimonials",
      icon: FaQuoteLeft,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: FaEnvelope,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            Desktop + Mobile Navbar Header
        ========================================================= */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
              DS
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                DB_Shrestha
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                MERN Stack Developer
              </p>
            </div>
          </NavLink>

          {/* =========================================================
              Desktop Navigation
          ========================================================= */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                        : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="text-xs" />

                      <span>{item.name}</span>

                      {/* Active page indicator */}
                      <span
                        className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-300 dark:bg-blue-400 ${
                          isActive ? "w-5" : "w-0"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* =========================================================
              Right Side Controls
          ========================================================= */}
          <div className="flex items-center gap-2">
            {/* Dark / Light Mode */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* =========================================================
            Mobile Navigation
        ========================================================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-slate-200 dark:border-slate-800 lg:hidden"
            >
              <div className="py-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.03,
                      }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `mb-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                            isActive
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                              : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                          }`
                        }
                      >
                        <Icon />

                        <span>{item.name}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
