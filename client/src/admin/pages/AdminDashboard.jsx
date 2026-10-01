import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiFileText, FiFolder, FiMessageSquare, FiSettings, FiUser, FiUsers } from "react-icons/fi";
import { getAnalyticsSummary } from "../../services/analyticsService";

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [analyticsUnavailable, setAnalyticsUnavailable] = useState(false);

  useEffect(() => {
    getAnalyticsSummary()
      .then((response) => setAnalytics(response.summary))
      .catch(() => setAnalyticsUnavailable(true));
  }, []);

  const shortcuts = [
    { title: "Profile", description: "Identity and contact details", to: "/admin/profile", icon: FiUser },
    { title: "Projects", description: "Portfolio projects and galleries", to: "/admin/projects", icon: FiFolder },
    { title: "Messages", description: "Inbox and email replies", to: "/admin/messages", icon: FiMessageSquare },
    { title: "Resume", description: "Upload and publish a PDF", to: "/admin/resume", icon: FiFileText },
    { title: "User management", description: "Administrator accounts", to: "/admin/users", icon: FiUsers },
    { title: "Services", description: "Public service offerings", to: "/admin/services", icon: FiSettings },
  ];

  return (
    <section className="space-y-8 p-4 sm:p-6 lg:p-8">
      <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Portfolio workspace</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Welcome back, {admin?.name || "Admin"}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Choose a section to continue managing your portfolio.</p>
      </header>

      <section aria-labelledby="analytics-heading">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 id="analytics-heading" className="text-sm font-semibold text-slate-700 dark:text-slate-200">Audience overview</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Aggregate page views by UTC day; no visitor identities or IP addresses are stored.</p>
          </div>
          {analyticsUnavailable && <p role="status" className="text-xs text-amber-700 dark:text-amber-400">Page-view data is temporarily unavailable.</p>}
        </div>
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Page views today", value: analytics?.pageViewsToday },
            { label: "Page views · 30 days", value: analytics?.pageViewsLast30Days },
            { label: "Daily average · 30 days", value: analytics?.dailyAverage },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
              <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt>
              <dd className="mt-2 text-2xl font-bold tabular-nums text-slate-950 dark:text-white">
                {value === undefined ? (analyticsUnavailable ? "--" : "…") : value.toLocaleString()}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div>
        <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">Quick access</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {shortcuts.map(({ title, description, to, icon: Icon }) => <Link key={to} to={to} className="group flex min-h-28 items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-emerald-600 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"><Icon size={18} /></span><span><span className="block text-sm font-semibold text-slate-900 dark:text-white">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</span></span></div>
            <FiArrowUpRight className="shrink-0 text-slate-400 transition group-hover:text-emerald-700" size={17} />
          </Link>)}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;