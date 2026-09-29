import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import PublicLayout from "./layouts/PublicLayout";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Services";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./components/ScrollToTop";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLogin from "./admin/pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminSkills from "./admin/pages/AdminSkills";
import AdminServices from "./admin/pages/AdminServices";
import AdminExperience from "./admin/pages/AdminExperience";
import AdminEducation from "./admin/pages/AdminEducation";
import AdminTestimonials from "./admin/pages/AdminTestimonials";
import AdminMessages from "./admin/pages/AdminMessages";
import AdminSocialLinks from "./admin/pages/AdminSocialLinks";
import AdminResume from "./admin/pages/AdminResume";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminPrivacy from "./admin/pages/AdminPrivacy";

const routeTitles = {
  "/": "Durga Bahadur Shrestha | Portfolio",
  "/about": "Durga Bahadur Shrestha | About",
  "/skills": "Durga Bahadur Shrestha | Skills",
  "/services": "Durga Bahadur Shrestha | Services",
  "/experience": "Durga Bahadur Shrestha | Experience",
  "/education": "Durga Bahadur Shrestha | Education",
  "/projects": "Durga Bahadur Shrestha | Projects",
  "/testimonials": "Durga Bahadur Shrestha | Testimonials",
  "/contact": "Durga Bahadur Shrestha | Contact",
  "/privacy": "Durga Bahadur Shrestha | Privacy Policy",
  "/admin/login": "Admin Login | Durga Bahadur Shrestha",
  "/admin": "Admin Dashboard | Durga Bahadur Shrestha",
  "/admin/profile": "Profile Management | Durga Bahadur Shrestha",
  "/admin/skills": "Skills Management | Durga Bahadur Shrestha",
  "/admin/services": "Services Management | Durga Bahadur Shrestha",
  "/admin/experience": "Experience Management | Durga Bahadur Shrestha",
  "/admin/education": "Education Management | Durga Bahadur Shrestha",
  "/admin/projects": "Projects Management | Durga Bahadur Shrestha",
  "/admin/testimonials": "Testimonials Management | Durga Bahadur Shrestha",
  "/admin/messages": "Messages | Durga Bahadur Shrestha",
  "/admin/social-links": "Social Links Management | Durga Bahadur Shrestha",
  "/admin/privacy": "Privacy Policy Management | Durga Bahadur Shrestha",
  "/admin/resume": "Resume Management | Durga Bahadur Shrestha",
  "/admin/users": "User Management | Durga Bahadur Shrestha",
};

const RouteMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || "Durga Bahadur Shrestha | Portfolio";
    document.title = title;

    const description = "Durga Bahadur Shrestha portfolio, services, projects, and contact information.";
    let metaTag = document.querySelector("meta[name='description']");

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", description);
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteMeta />
        <ScrollToTop />
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
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
