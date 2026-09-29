import { useEffect, useState } from "react";

import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

const emptyForm = {
  name: "",
  category: "",
  proficiency: 80,
  icon: "",
  order: 0,
  isActive: true,
};

const AdminSkills = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSkills = async () => {
    try {
      setLoading(true);
      const response = await getAllSkills();
      setItems(response.skills || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        proficiency: Number(form.proficiency),
        order: Number(form.order || 0),
      };

      if (editingId) {
        await updateSkill(editingId, payload);
      } else {
        await createSkill(payload);
      }

      resetForm();
      await loadSkills();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save skill.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      category: item.category,
      proficiency: item.proficiency,
      icon: item.icon || "",
      order: item.order || 0,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete skill.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skills</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Manage technical skills shown on the public portfolio.</p>
        </div>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="mb-4 text-xl font-semibold">{editingId ? "Edit skill" : "Add skill"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Skill name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Proficiency (%)</label>
                <input type="number" min="0" max="100" name="proficiency" value={form.proficiency} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Order</label>
                <input type="number" name="order" value={form.order} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Icon name</label>
              <input name="icon" value={form.icon} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" placeholder="FaReact, SiNodejs, etc." />
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
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="mb-4 text-xl font-semibold">Current skills</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No skills yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.category} • {item.proficiency}%</p>
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

export default AdminSkills;
