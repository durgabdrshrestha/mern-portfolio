import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";

import PublicLayout from "./layouts/PublicLayout";
import { AuthProvider } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Services = lazy(() => import("./pages/Services"));
const Experience = lazy(() => import("./pages/Experience"));
const Education = lazy(() => import("./pages/Education"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
import ScrollToTop from "./components/ScrollToTop";

const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));
import ProtectedRoute from "./components/ProtectedRoute";
const AdminProjects = lazy(() => import("./admin/pages/AdminProjects"));
const AdminProfile = lazy(() => import("./admin/pages/AdminProfile"));
const AdminSkills = lazy(() => import("./admin/pages/AdminSkills"));
const AdminServices = lazy(() => import("./admin/pages/AdminServices"));
const AdminExperience = lazy(() => import("./admin/pages/AdminExperience"));
const AdminEducation = lazy(() => import("./admin/pages/AdminEducation"));
const AdminTestimonials = lazy(() => import("./admin/pages/AdminTestimonials"));
const AdminMessages = lazy(() => import("./admin/pages/AdminMessages"));
const AdminSocialLinks = lazy(() => import("./admin/pages/AdminSocialLinks"));
const AdminResume = lazy(() => import("./admin/pages/AdminResume"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers"));
const AdminPrivacy = lazy(() => import("./admin/pages/AdminPrivacy"));
import { recordPageView } from "./services/analyticsService";

const routeMetadata = {
  "/": {
    title: "Durga Bahadur Shrestha | MERN Stack Developer",
    description: "Official portfolio of Durga Bahadur Shrestha, a MERN stack developer and IT support professional in Nepal. Explore projects, skills, experience, and contact details.",
  },
  "/about": {
    title: "About Durga Bahadur Shrestha | Developer Portfolio",
    description: "Learn about Durga Bahadur Shrestha, his background, experience, and work as a MERN stack developer and IT support professional.",
  },
  "/skills": {
    title: "Technical Skills | Durga Bahadur Shrestha",
    description: "Explore the web development, MERN stack, and IT support skills of Durga Bahadur Shrestha.",
  },
  "/services": {
    title: "Development Services | Durga Bahadur Shrestha",
    description: "MERN stack development and practical web services from Durga Bahadur Shrestha.",
  },
  "/experience": {
    title: "Professional Experience | Durga Bahadur Shrestha",
    description: "Review the development and IT support experience of Durga Bahadur Shrestha.",
  },
  "/education": {
    title: "Education | Durga Bahadur Shrestha",
    description: "Education and academic background of MERN stack developer Durga Bahadur Shrestha.",
  },
  "/projects": {
    title: "Web Development Projects | Durga Bahadur Shrestha",
    description: "Browse web applications and software projects built by MERN stack developer Durga Bahadur Shrestha.",
  },
  "/testimonials": {
    title: "Client Testimonials | Durga Bahadur Shrestha",
    description: "Testimonials and recommendations for the work of Durga Bahadur Shrestha.",
  },
  "/contact": {
    title: "Contact Durga Bahadur Shrestha | Work Inquiries",
    description: "Contact Durga Bahadur Shrestha about MERN stack development, IT support, and professional opportunities.",
  },
  "/privacy": {
    title: "Privacy Policy | Durga Bahadur Shrestha",
    description: "Privacy information for visitors and people contacting Durga Bahadur Shrestha through this portfolio.",
  },
  "/admin/login": {
    title: "Admin Login | Durga Bahadur Shrestha",
    description: "Portfolio administration sign-in.",
  },
};

const RouteMeta = () => {
  const location = useLocation();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    const metadata = routeMetadata[location.pathname] || (location.pathname.startsWith("/admin")
      ? {
          title: "Portfolio Admin | Durga Bahadur Shrestha",
          description: "Portfolio administration.",
        }
      : location.pathname.startsWith("/projects/")
        ? {
            title: "Project Details | Durga Bahadur Shrestha",
            description: "Project details, technologies, and outcomes from the portfolio of Durga Bahadur Shrestha.",
          }
        : {
            title: "Durga Bahadur Shrestha | MERN Stack Developer",
            description: "Explore the portfolio, projects, and professional experience of Durga Bahadur Shrestha.",
          });
    const canonicalOrigin = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, "");
    const canonicalUrl = `${canonicalOrigin}${location.pathname}`;
    const isAdminRoute = location.pathname.startsWith("/admin");

    document.title = metadata.title;

    const setMeta = (selector, attribute, key, value) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    setMeta("meta[name='description']", "name", "description", metadata.description);
    setMeta("meta[name='robots']", "name", "robots", isAdminRoute ? "noindex, nofollow" : "index, follow");
    setMeta("meta[property='og:type']", "property", "og:type", "website");
    setMeta("meta[property='og:title']", "property", "og:title", metadata.title);
    setMeta("meta[property='og:description']", "property", "og:description", metadata.description);
    setMeta("meta[property='og:url']", "property", "og:url", canonicalUrl);
    setMeta("meta[name='twitter:card']", "name", "twitter:card", "summary");
    setMeta("meta[name='twitter:title']", "name", "twitter:title", metadata.title);
    setMeta("meta[name='twitter:description']", "name", "twitter:description", metadata.description);

    let canonical = document.head.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let personSchema = document.getElementById("person-schema");
    if (!personSchema) {
      personSchema = document.createElement("script");
      personSchema.id = "person-schema";
      personSchema.type = "application/ld+json";
      document.head.appendChild(personSchema);
    }
    personSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Durga Bahadur Shrestha",
      jobTitle: "MERN Stack Developer and IT Support Professional",
      url: canonicalOrigin,
    });

    if (!isAdminRoute && lastTrackedPath.current !== location.pathname) {
      lastTrackedPath.current = location.pathname;
      recordPageView().catch(() => {});
    }
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteMeta />
        <ScrollToTop />
        <Suspense fallback={<div role="status" className="flex min-h-64 items-center justify-center text-sm text-slate-600 dark:text-slate-300">Loading page...</div>}>
          <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/services" element={<Services />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="education" element={<AdminEducation />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="social-links" element={<AdminSocialLinks />} />
              <Route path="privacy" element={<AdminPrivacy />} />
              <Route path="resume" element={<AdminResume />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
