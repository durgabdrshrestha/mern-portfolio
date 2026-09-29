import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createAdminUser, deleteAdminUser, getAdminUsers, updateAdminUser } from "../../services/adminUserService";

const emptyForm = { name: "", email: "", password: "" };
const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900";

const AdminUsers = () => {
  const { admin: currentAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getAdminUsers();
      setUsers(response.users || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load admin accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      if (editingId) {
        const { password, ...account } = form;
        await updateAdminUser(editingId, password ? form : account);
        setSuccess("Admin account updated.");
      } else {
        await createAdminUser(form);
        setSuccess("Admin account created.");
      }
      resetForm();
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save admin account.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, password: "" });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete admin account for ${user.name}?`)) return;
    setError("");
    try {
      await deleteAdminUser(user.id);
      setSuccess("Admin account deleted.");
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete admin account.");
    }
  };

  return (
    <section className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Access control</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">User management</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage administrator accounts for this portfolio.</p>
      </header>
      {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      {success && <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{success}</div>}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">{editingId ? "Edit administrator" : "Add administrator"}</h2>{editingId && <button type="button" onClick={resetForm} className="text-sm underline">Cancel</button>}</div>
          <label className="block space-y-1.5 text-sm font-medium">Name<input className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
          <label className="block space-y-1.5 text-sm font-medium">Email<input className={inputClass} type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
          <label className="block space-y-1.5 text-sm font-medium">{editingId ? "New password (optional)" : "Password"}<input className={inputClass} type="password" autoComplete="new-password" minLength={12} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required={!editingId} /></label>
          <p className="text-xs text-slate-500">Passwords must contain at least 12 characters.</p>
          <button type="submit" disabled={saving} className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save account" : "Create account"}</button>
        </form>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800"><h2 className="font-semibold">Administrators</h2><span className="text-sm text-slate-500">{users.length} accounts</span></div>
          {loading ? <p className="p-5 text-sm text-slate-500">Loading accounts...</p> : users.length === 0 ? <p className="p-5 text-sm text-slate-500">No admin accounts found.</p> : <ul className="divide-y divide-slate-100 dark:divide-slate-800">{users.map((user) => <li key={user.id} className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-5"><div className="min-w-0"><p className="truncate text-sm font-semibold">{user.name}{String(currentAdmin?.id || currentAdmin?._id) === String(user.id) && <span className="ml-2 text-xs font-normal text-emerald-700">You</span>}</p><p className="truncate text-sm text-slate-500">{user.email}</p></div><div className="flex gap-2"><button type="button" onClick={() => handleEdit(user)} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium dark:border-slate-700">Edit</button><button type="button" onClick={() => handleDelete(user)} disabled={String(currentAdmin?.id || currentAdmin?._id) === String(user.id)} className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 disabled:cursor-not-allowed disabled:opacity-40">Delete</button></div></li>)}</ul>}
        </section>
      </div>
    </section>
  );
};

export default AdminUsers;