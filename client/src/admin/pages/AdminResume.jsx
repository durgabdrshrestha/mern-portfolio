import { useEffect, useState } from "react";

import {
  getAllResumes,
  createResume,
  updateResume,
  deleteResume,
} from "../../services/resumeService";
import { resolveAssetUrl } from "../../services/api";

const emptyForm = {
  title: "",
  url: "",
  version: "1.0",
  downloadEnabled: true,
  isActive: true,
};

const AdminResume = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [resumeFile, setResumeFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadResumes = async () => {
    try {
      setLoading(true);
      const response = await getAllResumes();
      setItems(response.resumes || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setResumeFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = { ...form };

      if (editingId) {
        await updateResume(editingId, payload, resumeFile);
      } else {
        await createResume(payload, resumeFile);
      }

      resetForm();
      await loadResumes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save resume.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      url: item.url,
      version: item.version || "1.0",
      downloadEnabled: Boolean(item.downloadEnabled),
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await deleteResume(id);
      await loadResumes();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete resume.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Resume</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Upload or manage downloadable resume files for your portfolio.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit resume" : "Add resume"}</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="resumeFile">Resume PDF</label>
            <input id="resumeFile" type="file" accept="application/pdf,.pdf" onChange={(event) => setResumeFile(event.target.files?.[0] || null)} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required={!editingId && !form.url} />
            {form.url && <a href={resolveAssetUrl(form.url)} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-medium text-emerald-700 underline dark:text-emerald-400">Open current resume</a>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Version</label>
              <input name="version" value={form.version} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div className="flex items-center gap-2 pt-8">
              <input type="checkbox" name="downloadEnabled" checked={form.downloadEnabled} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm">Downloadable</label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4" />
            <label className="text-sm">Active resume</label>
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
          <h2 className="mb-4 text-xl font-semibold">Resume library</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No resumes found.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.version}</p>
                      <a href={resolveAssetUrl(item.url)} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-emerald-700 underline dark:text-emerald-400">View file</a>
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

export default AdminResume;
