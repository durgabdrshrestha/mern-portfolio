import { useEffect, useState } from "react";

import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../services/serviceService";
import { SERVER_BASE_URL } from "../../services/api";

const emptyForm = {
  title: "",
  shortDescription: "",
  description: "",
  icon: "",
  image: "",
  features: "",
  order: 0,
  isActive: true,
};

const AdminServices = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await getAllServices();
      setItems(response.services || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        features: form.features
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        order: Number(form.order || 0),
      };

      if (editingId) {
        await updateService(editingId, payload, imageFile);
      } else {
        await createService(payload, imageFile);
      }

      resetForm();
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save service.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      shortDescription: item.shortDescription,
      description: item.description,
      icon: item.icon || "",
      image: item.image || "",
      features: Array.isArray(item.features) ? item.features.join("\n") : "",
      order: item.order || 0,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await deleteService(id);
      await loadServices();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete service.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Services</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Add, update and publish service offerings for your portfolio.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit service" : "Add service"}</h2>

          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Short description</label>
            <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows="2" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="5" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Icon</label>
              <input name="icon" value={form.icon} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" placeholder="FaCode" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="serviceImage">Service image</label>
            <input id="serviceImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            {form.image && <img src={form.image.startsWith("http") ? form.image : `${SERVER_BASE_URL}${form.image}`} alt="Current service" className="mt-3 h-20 w-28 rounded-lg object-cover" />}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Features (one per line)</label>
            <textarea name="features" value={form.features} onChange={handleChange} rows="4" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
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
          <h2 className="mb-4 text-xl font-semibold">Current services</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No services found.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.shortDescription}</p>
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

export default AdminServices;
