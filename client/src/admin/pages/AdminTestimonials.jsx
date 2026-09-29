import { useEffect, useState } from "react";

import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../services/testimonialService";
import { SERVER_BASE_URL } from "../../services/api";

const emptyForm = {
  name: "",
  role: "",
  company: "",
  image: "",
  message: "",
  rating: 5,
  relationship: "Client",
  website: "",
  isFeatured: false,
  order: 0,
  isActive: true,
};

const AdminTestimonials = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const response = await getAllTestimonials();
      setItems(response.testimonials || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
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
        rating: Number(form.rating),
        order: Number(form.order || 0),
      };

      if (editingId) {
        await updateTestimonial(editingId, payload, imageFile);
      } else {
        await createTestimonial(payload, imageFile);
      }

      resetForm();
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save testimonial.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      role: item.role || "",
      company: item.company || "",
      image: item.image || "",
      message: item.message,
      rating: item.rating || 5,
      relationship: item.relationship || "Client",
      website: item.website || "",
      isFeatured: Boolean(item.isFeatured),
      order: item.order || 0,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      await deleteTestimonial(id);
      await loadTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete testimonial.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Testimonials</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Manage client and colleague feedback for your site.</p>
      </div>

      {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-semibold">{editingId ? "Edit testimonial" : "Add testimonial"}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Role</label>
              <input name="role" value={form.role} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Company</label>
              <input name="company" value={form.company} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Relationship</label>
              <select name="relationship" value={form.relationship} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                <option>Client</option>
                <option>Employer</option>
                <option>Colleague</option>
                <option>Student</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Website</label>
              <input name="website" value={form.website} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Rating</label>
              <input type="number" min="1" max="5" name="rating" value={form.rating} onChange={handleChange} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="testimonialImage">Portrait</label>
            <input id="testimonialImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            {form.image && <img src={form.image.startsWith("http") ? form.image : `${SERVER_BASE_URL}${form.image}`} alt="Current testimonial portrait" className="mt-3 h-20 w-20 rounded-full object-cover" />}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows="5" className="w-full rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm">Featured</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="h-4 w-4" />
              <label className="text-sm">Visible on public site</label>
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
          <h2 className="mb-4 text-xl font-semibold">Current testimonials</h2>
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No testimonials found.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.role || item.company || "Client"}</p>
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

export default AdminTestimonials;
