import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaGlobe,
  FaLink,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import { getSocialLinks } from "../services/socialLinkService";

// Map database icon names to React Icons
const iconMap = {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaGlobe,
  FaLink,
};

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const response = await getSocialLinks();

        // Only use active social links
        const activeLinks = (response.socialLinks || [])
          .filter((link) => link.isActive && !/(?:yourusername|example\.com|fcebook\.com)/i.test(link.url))
          .sort((a, b) => a.order - b.order);

        setSocialLinks(activeLinks);
      } catch (error) {
        console.error("Social links loading error:", error);
        setSocialLinks([]);
      } finally {
        setLoading(false);
      }
    };

    loadSocialLinks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {socialLinks.map((social) => {
        const Icon = iconMap[social.icon] || FaLink;

        return (
          <a
            key={social._id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            title={social.platform}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              border border-slate-200
              bg-white
              text-slate-600
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-blue-500
              hover:text-blue-600
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:border-blue-400
              dark:hover:text-blue-400
            "
          >
            <Icon className="text-lg" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;