import { useEffect, useState } from "react";

import {
  getAllEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../services/educationService";
import { SERVER_BASE_URL } from "../../services/api";

const emptyForm = {
  degree: "",
  institution: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  achievements: "",
  institutionWebsite: "",
  institutionImage: "",
  order: 0,
  isActive: true,
};

const AdminEducation = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [institutionImageFile, setInstitutionImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadEducation = async () => {
    try {
      setLoading(true);
      const response = await getAllEducations();
      setItems(response.educations || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load education.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setInstitutionImageFile(null);
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
        achievements: form.achievements.split("\n").map((item) => item.trim()).filter(Boolean),
        order: Number(form.order || 0),
      };

      if (editingId) {
        await updateEducation(editingId, payload, institutionImageFile);
      } else {
        await createEducation(payload, institutionImageFile);
      }

      resetForm();
      await loadEducation();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save education.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      degree: item.degree,
      institution: item.institution,
      fieldOfStudy: item.fieldOfStudy || "",
      location: item.location || "",
      startDate: item.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : "",
      endDate: item.endDate ? new Date(item.endDate).toISOString().slice(0, 10) : "",
      isCurrent: Boolean(item.isCurrent),
      description: item.description || "",
      achievements: Array.isArray(item.achievements) ? item.achievements.join("\n") : "",
      institutionWebsite: item.institutionWebsite || "",
      institutionImage: item.institutionImage || "",
      order: item.order || 0,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this education entry?")) return;

    try {
      await deleteEducation(id);
      await loadEducation();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete education.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Education</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Update your academic background and qualifications.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit education" : "Add education"}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Degree</label>
              <input name="degree" value={form.degree} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Institution</label>
              <input name="institution" value={form.institution} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Field of study</label>
              <input name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
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
            <label className="text-sm">Currently studying</label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Achievements (one per line)</label>
            <textarea name="achievements" value={form.achievements} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Institution website</label>
              <input name="institutionWebsite" value={form.institutionWebsite} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="institutionImage">Institution image</label>
              <input id="institutionImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setInstitutionImageFile(event.target.files?.[0] || null)} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
              {form.institutionImage && <img src={form.institutionImage.startsWith("http") ? form.institutionImage : `${SERVER_BASE_URL}${form.institutionImage}`} alt="Current institution" className="mt-3 h-20 w-28 rounded-lg object-cover" />}
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
          <h2 className="mb-4 text-xl font-semibold">Academic history</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No education entries yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.degree}</p>
                      <p className="text-sm text-slate-500">{item.institution}</p>
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

export default AdminEducation;
