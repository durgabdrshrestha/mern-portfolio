import { useEffect, useState } from "react";

import {
  getProfile,
  createProfile,
  updateProfile,
} from "../../services/profileService";
import { resolveAssetUrl } from "../../services/api";

const emptyForm = {
  name: "",
  title: "",
  shortBio: "",
  about: "",
  profileImage: "",
  homeImage: "",
  aboutImage: "",
  email: "",
  phone: "",
  location: "",
  availableForWork: true,
};

const AdminProfile = () => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [imageFiles, setImageFiles] = useState({ homeImage: null, aboutImage: null });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const response = await getProfile();

        if (response?.profile) {
          setHasProfile(true);
          setForm({
            ...emptyForm,
            ...response.profile,
            availableForWork: Boolean(response.profile.availableForWork),
          });
        } else {
          setHasProfile(false);
          setForm(emptyForm);
        }
      } catch (err) {
        const message = err.response?.data?.message || "Unable to load profile.";
        setError(message);
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    setImageFiles((previous) => ({ ...previous, [name]: files?.[0] || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (hasProfile) {
        const response = await updateProfile(form, imageFiles);
        if (response.profile) setForm((current) => ({ ...current, ...response.profile }));
        setSuccess(response.message || "Profile updated successfully.");
      } else {
        const response = await createProfile(form, imageFiles);
        if (response.profile) setForm((current) => ({ ...current, ...response.profile }));
        setHasProfile(true);
        setSuccess(response.message || "Profile created successfully.");
      }
      setImageFiles({ homeImage: null, aboutImage: null });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-600">Loading profile...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile Management</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Update your public portfolio identity, bio, contact info and resume.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {success && (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Professional title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Short bio</label>
            <textarea name="shortBio" value={form.shortBio} onChange={handleChange} rows="3" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">About</label>
            <textarea name="about" value={form.about} onChange={handleChange} rows="6" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="homeImage">Home section image</label>
            <input id="homeImage" name="homeImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            {imageFiles.homeImage && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Selected: {imageFiles.homeImage.name}</p>}
            {(form.homeImage || form.profileImage) && <img src={resolveAssetUrl(form.homeImage || form.profileImage)} alt="Current home section" className="mt-3 h-24 w-24 rounded-xl object-cover" />}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="aboutImage">About section image</label>
            <input id="aboutImage" name="aboutImage" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImageChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
            {imageFiles.aboutImage && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Selected: {imageFiles.aboutImage.name}</p>}
            {(form.aboutImage || form.profileImage) && <img src={resolveAssetUrl(form.aboutImage || form.profileImage)} alt="Current about section" className="mt-3 h-24 w-24 rounded-xl object-cover" />}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" required />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900" />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <input id="availableForWork" type="checkbox" name="availableForWork" checked={form.availableForWork} onChange={handleChange} className="h-4 w-4" />
            <label htmlFor="availableForWork" className="text-sm font-medium">Available for work</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white disabled:opacity-60 dark:bg-white dark:text-slate-900">
            {saving ? "Saving..." : hasProfile ? "Update profile" : "Create profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
