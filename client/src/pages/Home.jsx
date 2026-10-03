import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import AboutPreview from "../components/AboutPreview";
import SkillsPreview from "../components/SkillsPreview";
import ServicesPreview from "../components/ServicesPreview";
import ExperiencePreview from "../components/ExperiencePreview";
import EducationPreview from "../components/EducationPreview";
import ProjectsPreview from "../components/ProjectsPreview";
import TestimonialsPreview from "../components/TestimonialsPreview";
import ContactPreview from "../components/ContactPreview";

import { getProfile } from "../services/profileService";
import { getResume } from "../services/resumeService";
import { getSkills } from "../services/skillService";
import { getServices } from "../services/serviceService";
import { getExperiences } from "../services/experienceService";
import { getEducations } from "../services/educationService";
import { getProjects } from "../services/projectService";
import { getTestimonials } from "../services/testimonialService";

const Home = () => {
  // Profile information
  const [profile, setProfile] = useState(null);

  // Resume is optional
  const [resume, setResume] = useState(null);

  // Skills list
  const [skills, setSkills] = useState([]);

  // Services list
  const [services, setServices] = useState([]);

  // Experiences list
  const [experiences, setExperiences] = useState([]);

  // Education list
  const [educations, setEducations] = useState([]);

  // Projects list
  const [projects, setProjects] = useState([]);

  // Testimonials list
  const [testimonials, setTestimonials] = useState([]);

  // Page loading state
  const [loading, setLoading] = useState(true);

  // Page error
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.allSettled([
          getProfile(),
          getResume(),
          getSkills(),
          getServices(),
          getExperiences(),
          getEducations(),
          getProjects(),
          getTestimonials(),
        ]);
        const getValue = (index, key) =>
          results[index].status === "fulfilled"
            ? results[index].value?.[key]
            : null;

        setProfile(getValue(0, "profile"));
        setResume(getValue(1, "resume"));
        setSkills(getValue(2, "skills") || []);
        setServices(getValue(3, "services") || []);
        setExperiences(getValue(4, "experiences") || []);
        setEducations(getValue(5, "educations") || []);
        setProjects(getValue(6, "projects") || []);
        setTestimonials(getValue(7, "testimonials") || []);
      } catch {
        setError("Unable to load portfolio information.");
      } finally {
        // IMPORTANT:
        // Loading must ALWAYS stop here.
        setLoading(false);
      }
    };

    loadHomeData();
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
    return <ErrorMessage message={error} />;
  }

  // ==========================================
  // Home Page
  // ==========================================
  return (
    <>
      {/* Hero Section */}
      <Hero profile={profile} resume={resume} />

      {/* About Preview */}
      <AboutPreview profile={profile} experiences={experiences} />

      {/* Featured Skills */}
      <SkillsPreview skills={skills} />

      {/* Services Preview */}
      <ServicesPreview services={services} />

      {/* Experience */}
      <ExperiencePreview experiences={experiences} />

      {/* Education */}
      <EducationPreview educations={educations} />

      {/* Projects */}
      <ProjectsPreview projects={projects} />

      {/* Testimonials */}
      <TestimonialsPreview testimonials={testimonials} />

      {/* Contact */}
      <ContactPreview />
    </>
  );
};

export default Home;
