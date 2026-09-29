import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";

const AdminTopbar = ({ onMenuClick }) => {
  const { admin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const adminName = admin?.name || "Admin";
  const initials = adminName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onMenuClick} aria-label="Open navigation" className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden dark:text-slate-200 dark:hover:bg-slate-800"><FiMenu size={20} /></button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-slate-950 dark:text-white sm:text-lg">Admin Dashboard</h1>
          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Manage your portfolio</p>
        </div>
      </div>
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-white">{loading ? "…" : initials}</div>
        <div className="min-w-0 max-w-32 sm:max-w-48">
          <p className="truncate text-xs font-semibold text-slate-900 dark:text-white sm:text-sm">{loading ? "Loading..." : adminName}</p>
          <p className="hidden text-xs text-slate-500 sm:block">Administrator</p>
        </div>
        <button type="button" title="Sign out" aria-label="Sign out" onClick={() => { logout(); navigate("/admin/login"); }} className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"><FiLogOut size={18} /></button>
      </div>
    </header>
  );
};

export default AdminTopbar;