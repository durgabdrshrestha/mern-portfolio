import { useEffect, useState } from "react";

import {
  createProject,
  deleteProject,
  deleteProjectGalleryImage,
  getAllProjects,
  updateProject,
} from "../../services/projectService";
import { SERVER_BASE_URL } from "../../services/api";

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  technologies: "",
  category: "Web Development",
  githubUrl: "",
  liveUrl: "",
  projectType: "Personal",
  completionDate: "",
  features: "",
  challenges: "",
  status: "Completed",
  isFeatured: false,
  order: 0,
  isActive: true,
  image: "",
};

const fieldClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

const assetUrl = (url) => url?.startsWith("http") ? url : `${SERVER_BASE_URL}${url || ""}`;

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllProjects();
      setProjects(response.projects || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setGalleryImages([]);
    setMainImageFile(null);
    setGalleryFiles([]);
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setGalleryImages(project.images || []);
    setMainImageFile(null);
    setGalleryFiles([]);
    setForm({
      ...emptyForm,
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : "",
      features: Array.isArray(project.features) ? project.features.join("\n") : "",
      challenges: Array.isArray(project.challenges) ? project.challenges.join("\n") : "",
      completionDate: project.completionDate ? new Date(project.completionDate).toISOString().slice(0, 10) : "",
      isFeatured: Boolean(project.isFeatured),
      isActive: Boolean(project.isActive),
      image: project.image || "",
    });
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      technologies: form.technologies.split(",").map((value) => value.trim()).filter(Boolean),
      features: form.features.split("\n").map((value) => value.trim()).filter(Boolean),
      challenges: form.challenges.split("\n").map((value) => value.trim()).filter(Boolean),
      completionDate: form.completionDate || "",
      order: Number(form.order || 0),
    };

    try {
      if (editingId) {
        await updateProject(editingId, payload, mainImageFile, galleryFiles);
        setSuccess("Project updated successfully.");
      } else {
        await createProject(payload, mainImageFile, galleryFiles);
        setSuccess("Project created successfully.");
      }
      resetForm();
      await loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project and its uploaded images?")) return;
    try {
      await deleteProject(id);
      if (editingId === id) resetForm();
      setSuccess("Project deleted.");
      await loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project.");
    }
  };

  const handleDeleteGalleryImage = async (imageUrl) => {
    try {
      await deleteProjectGalleryImage(editingId, imageUrl);
      setGalleryImages((current) => current.filter((image) => image !== imageUrl));
      await loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove gallery image.");
    }
  };

  return (
    <section className="space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">Portfolio content</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Create, edit, publish, and organize project entries.</p>
        </div>
        <span className="text-sm text-slate-500">{projects.length} total</span>
      </header>

      {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      {success && <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{success}</div>}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <h2 className="text-lg font-semibold">{editingId ? "Edit project" : "New project"}</h2>
            {editingId && <button type="button" onClick={resetForm} className="text-sm font-medium text-slate-600 underline dark:text-slate-300">Cancel edit</button>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">Title<input className={fieldClass} name="title" value={form.title} onChange={handleChange} required /></label>
            <label className="space-y-1.5 text-sm font-medium">URL slug<input className={fieldClass} name="slug" value={form.slug} onChange={handleChange} required /></label>
          </div>
          <label className="block space-y-1.5 text-sm font-medium">Short description<textarea className={fieldClass} name="shortDescription" value={form.shortDescription} onChange={handleChange} rows="2" required /></label>
          <label className="block space-y-1.5 text-sm font-medium">Full description<textarea className={fieldClass} name="description" value={form.description} onChange={handleChange} rows="5" required /></label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">Category<input className={fieldClass} name="category" value={form.category} onChange={handleChange} /></label>
            <label className="space-y-1.5 text-sm font-medium">Project type<select className={fieldClass} name="projectType" value={form.projectType} onChange={handleChange}>{["Personal", "Client", "Freelance", "Practice", "Open Source", "Blog", "Other"].map((value) => <option key={value}>{value}</option>)}</select></label>
            <label className="space-y-1.5 text-sm font-medium">Status<select className={fieldClass} name="status" value={form.status} onChange={handleChange}>{["Completed", "In Progress", "Planned", "Maintenance"].map((value) => <option key={value}>{value}</option>)}</select></label>
            <label className="space-y-1.5 text-sm font-medium">Completion date<input className={fieldClass} type="date" name="completionDate" value={form.completionDate} onChange={handleChange} /></label>
          </div>

          <label className="block space-y-1.5 text-sm font-medium">Technologies (comma separated)<input className={fieldClass} name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">Features (one per line)<textarea className={fieldClass} name="features" value={form.features} onChange={handleChange} rows="3" /></label>
            <label className="space-y-1.5 text-sm font-medium">Challenges (one per line)<textarea className={fieldClass} name="challenges" value={form.challenges} onChange={handleChange} rows="3" /></label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">Live URL<input className={fieldClass} type="url" name="liveUrl" value={form.liveUrl} onChange={handleChange} /></label>
            <label className="space-y-1.5 text-sm font-medium">Repository URL<input className={fieldClass} type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange} /></label>
            <label className="space-y-1.5 text-sm font-medium">Display order<input className={fieldClass} type="number" name="order" value={form.order} onChange={handleChange} /></label>
            <div className="space-y-3 pt-1">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} /> Featured project</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Visible on portfolio</label>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-medium">Main image<input className={fieldClass} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setMainImageFile(event.target.files?.[0] || null)} /></label>
            <label className="space-y-1.5 text-sm font-medium">Add gallery images<input className={fieldClass} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))} /></label>
          </div>
          {form.image && <img src={assetUrl(form.image)} alt="Current project main image" className="h-36 w-full rounded-lg object-cover sm:w-64" />}

          {editingId && galleryImages.length > 0 && <div className="space-y-2"><h3 className="text-sm font-semibold">Current gallery</h3><div className="flex flex-wrap gap-3">{galleryImages.map((image) => <div key={image} className="relative"><img src={assetUrl(image)} alt="Project gallery" className="h-20 w-24 rounded-md object-cover" /><button type="button" aria-label="Remove gallery image" title="Remove image" onClick={() => handleDeleteGalleryImage(image)} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-700 text-xs text-white">×</button></div>)}</div></div>}

          <button type="submit" disabled={saving} className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save project" : "Create project"}</button>
        </form>

        <section className="space-y-3" aria-label="Project list">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">All projects</h2>{loading && <span className="text-xs text-slate-500">Loading...</span>}</div>
          {!loading && projects.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">No projects yet.</div> : projects.map((project) => <article key={project._id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            {project.image && <img src={assetUrl(project.image)} alt="" className="h-36 w-full object-cover" />}
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold">{project.title}</h3><p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{project.shortDescription}</p></div><span className={`shrink-0 rounded px-2 py-1 text-xs ${project.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>{project.isActive ? "Published" : "Hidden"}</span></div>
              <p className="text-xs text-slate-500">{project.category || "Uncategorized"} · {project.status || "No status"}</p>
              <div className="flex gap-2 border-t border-slate-100 pt-3 dark:border-slate-800"><button type="button" onClick={() => handleEdit(project)} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">Edit</button><button type="button" onClick={() => handleDelete(project._id)} className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Delete</button></div>
            </div>
          </article>)}
        </section>
      </div>
    </section>
  );
};

export default AdminProjects;