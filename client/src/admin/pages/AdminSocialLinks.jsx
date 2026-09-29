import { useEffect, useState } from "react";

import {
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../services/socialLinkService";

const emptyForm = {
  platform: "",
  url: "",
  icon: "",
  username: "",
  order: 0,
  isActive: true,
};

const AdminSocialLinks = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadLinks = async () => {
    try {
      setLoading(true);
      const response = await getAllSocialLinks();
      setItems(response.socialLinks || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load social links.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        order: Number(form.order || 0),
      };

      if (editingId) {
        await updateSocialLink(editingId, payload);
      } else {
        await createSocialLink(payload);
      }

      resetForm();
      await loadLinks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save social link.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      platform: item.platform,
      url: item.url,
      icon: item.icon || "",
      username: item.username || "",
      order: item.order || 0,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this social link?")) return;

    try {
      await deleteSocialLink(id);
      await loadLinks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete social link.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Social Links</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Manage your public social media and contact links.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit link" : "Add link"}</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Platform</label>
            <input name="platform" value={form.platform} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">URL</label>
            <input name="url" value={form.url} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Icon</label>
              <input name="icon" value={form.icon} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Username</label>
              <input name="username" value={form.username} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm">Visible</label>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white disabled:opacity-60 dark:bg-white dark:text-slate-900">
              {saving ? "Saving..." : editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-4 py-2.5 font-medium dark:border-slate-700">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="mb-4 text-xl font-semibold">Current links</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No social links yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.platform}</p>
                      <p className="text-sm text-slate-500 break-all">{item.url}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(item)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs">Edit</button>
                      <button type="button" onClick={() => handleDelete(item._id)} className="rounded-lg border border-red-300 px-2 py-1 text-xs text-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSocialLinks;
