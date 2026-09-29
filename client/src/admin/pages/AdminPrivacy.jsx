import { useEffect, useState } from "react";

import {
  getAllPrivacyPolicies,
  createPrivacyPolicy,
  updatePrivacyPolicy,
  deletePrivacyPolicy,
} from "../../services/privacyService";

const emptyForm = {
  title: "Privacy Policy",
  summary: "",
  content: "",
  isActive: true,
};

const AdminPrivacy = () => {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadPolicies = async () => {
    try {
      setLoading(true);
      const response = await getAllPrivacyPolicies();
      setPolicies(response.policies || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load privacy policy entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId) {
        await updatePrivacyPolicy(editingId, form);
      } else {
        await createPrivacyPolicy(form);
      }

      resetForm();
      await loadPolicies();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save privacy policy.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (policy) => {
    setEditingId(policy._id);
    setForm({
      title: policy.title || "Privacy Policy",
      summary: policy.summary || "",
      content: policy.content || "",
      isActive: policy.isActive !== false,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this privacy policy?")) return;

    try {
      await deletePrivacyPolicy(id);
      await loadPolicies();
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete privacy policy.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Manage the public privacy page for your portfolio.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit policy" : "Add policy"}</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Summary</label>
            <textarea name="summary" value={form.summary} onChange={handleChange} rows="3" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows="10" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4" />
            <label className="text-sm">Publish this policy</label>
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
          <h2 className="mb-4 text-xl font-semibold">Saved versions</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : policies.length === 0 ? (
            <p className="text-slate-500">No privacy policies saved yet.</p>
          ) : (
            <div className="space-y-3">
              {policies.map((policy) => (
                <div key={policy._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{policy.title}</p>
                      <p className="text-xs text-slate-500">{policy.isActive ? "Published" : "Draft"}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(policy)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs">Edit</button>
                      <button type="button" onClick={() => handleDelete(policy._id)} className="rounded-lg border border-red-300 px-2 py-1 text-xs text-red-600">Delete</button>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{policy.summary || policy.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPrivacy;