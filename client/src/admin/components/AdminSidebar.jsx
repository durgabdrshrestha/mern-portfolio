import { NavLink } from "react-router-dom";
import { FiBriefcase, FiGrid, FiMessageSquare, FiUsers, FiX } from "react-icons/fi";

const AdminSidebar = ({ mobileOpen, onClose }) => {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: FiGrid },
    { name: "Profile", path: "/admin/profile", icon: FiUsers },
    { name: "Skills", path: "/admin/skills", icon: FiBriefcase },
    { name: "Services", path: "/admin/services", icon: FiBriefcase },
    { name: "Experience", path: "/admin/experience", icon: FiBriefcase },
    { name: "Education", path: "/admin/education", icon: FiBriefcase },
    { name: "Projects", path: "/admin/projects", icon: FiBriefcase },
    { name: "Testimonials", path: "/admin/testimonials", icon: FiMessageSquare },
    { name: "Messages", path: "/admin/messages", icon: FiMessageSquare },
    { name: "Social Links", path: "/admin/social-links", icon: FiBriefcase },
    { name: "Privacy", path: "/admin/privacy", icon: FiBriefcase },
    { name: "Resume", path: "/admin/resume", icon: FiBriefcase },
    { name: "User Management", path: "/admin/users", icon: FiUsers },
  ];

  const navigation = (
    <>
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">P</span>
          <div>
            <h2 className="font-semibold text-slate-950 dark:text-white">Portfolio MS</h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Management</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"><FiX size={18} /></button>
      </div>
      <nav aria-label="Admin navigation" className="min-h-0 flex-1 space-y-1 overflow-y-auto p-3">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin"}
            onClick={onClose}
            className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-emerald-700 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"}`}
          >
            <Icon size={17} aria-hidden="true" />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden h-screen min-h-0 w-64 shrink-0 overflow-hidden border-r border-slate-200 bg-white lg:flex lg:flex-col dark:border-slate-800 dark:bg-slate-950">{navigation}</aside>
      {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden">
        <button type="button" aria-label="Close navigation" onClick={onClose} className="absolute inset-0 bg-slate-950/45" />
        <aside className="relative flex h-full min-h-0 w-[min(18rem,85vw)] flex-col overflow-hidden border-r border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">{navigation}</aside>
      </div>}
    </>
  );
};

export default AdminSidebar;