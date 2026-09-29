import { useEffect, useState } from "react";

import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../services/experienceService";
import { SERVER_BASE_URL } from "../../services/api";

const emptyForm = {
  jobTitle: "",
  company: "",
  employmentType: "Full-time",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  responsibilities: "",
  technologies: "",
  companyWebsite: "",
  companyImage: "",
  order: 0,
  isActive: true,
};

const AdminExperience = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [companyImageFile, setCompanyImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadExperience = async () => {
    try {
      setLoading(true);
      const response = await getAllExperiences();
      setItems(response.experiences || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperience();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setCompanyImageFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        startDate: form.startDate || undefined,
        endDate: form.isCurrent ? null : form.endDate || null,
        responsibilities: form.responsibilities.split("\n").map((item) => item.trim()).filter(Boolean),
        technologies: form.technologies.split(",").map((item) => item.trim()).filter(Boolean),
        order: Number(form.order || 0),
      };

      if (editingId) {
        await updateExperience(editingId, payload, companyImageFile);
      } else {
        await createExperience(payload, companyImageFile);
      }

      resetForm();
      await loadExperience();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save experience.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      jobTitle: item.jobTitle,
      company: item.company,
      employmentType: item.employmentType || "Full-time",
      location: item.location || "",
      startDate: item.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : "",
      endDate: item.endDate ? new Date(item.endDate).toISOString().slice(0, 10) : "",
      isCurrent: Boolean(item.isCurrent),
      description: item.description,
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : "",
      technologies: Array.isArray(item.technologies) ? item.technologies.join(", ") : "",
      companyWebsite: item.companyWebsite || "",
      companyImage: item.companyImage || "",
      order: item.order || 0,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience item?")) return;

    try {
      await deleteExperience(id);
      await loadExperience();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete experience.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Experience</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Manage the work history shown on your public portfolio.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit experience" : "Add experience"}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Job title</label>
              <input name="jobTitle" value={form.jobTitle} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Company</label>
              <input name="company" value={form.company} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Employment type</label>
              <select name="employmentType" value={form.employmentType} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Internship</option>
                <option>Volunteer</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Location</label>
              <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Start date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">End date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" disabled={form.isCurrent} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isCurrent" checked={form.isCurrent} onChange={handleChange} className="h-4 w-4" />
            <label className="text-sm">Currently working here</label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Responsibilities (one per line)</label>
            <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Technologies (comma separated)</label>
            <input name="technologies" value={form.technologies} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Company website</label>
              <input name="companyWebsite" value={form.companyWebsite} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="companyImage">Company image</label>
              <input id="companyImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setCompanyImageFile(event.target.files?.[0] || null)} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
              {form.companyImage && <img src={form.companyImage.startsWith("http") ? form.companyImage : `${SERVER_BASE_URL}${form.companyImage}`} alt="Current company" className="mt-3 h-20 w-28 rounded-lg object-cover" />}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4" />
            <label className="text-sm">Visible on public site</label>
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
          <h2 className="mb-4 text-xl font-semibold">Work history</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No experience entries yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.jobTitle}</p>
                      <p className="text-sm text-slate-500">{item.company}</p>
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

export default AdminExperience;
