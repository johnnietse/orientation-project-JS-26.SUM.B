import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResume } from "../context";
import LogoDropzone from "../components/LogoDropzone";

export default function EditExperience() {
  const { id } = useParams();
  const { experience, setExperience, updateItem } = useResume();
  const navigate = useNavigate();
  const existing = experience.find((e) => e.id === Number(id));

  const [form, setForm] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing) setForm({
      title: existing.title || "",
      company: existing.company || "",
      start_date: existing.start_date || "",
      end_date: existing.end_date || "",
      description: existing.description || "",
      logo: existing.logo || "",
    });
  }, [existing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateItem("/resume/experience/", Number(id), form, setExperience, experience);
    } catch {
      setExperience(experience.map((i) => (i.id === Number(id) ? { ...i, ...form } : i)));
    }
    setSaved(true);
    setTimeout(() => navigate("/"), 800);
  }

  if (!existing) return <p>Experience not found.</p>;

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>&larr; Back to Resume</p>
      <h2>Edit Experience</h2>
      <form onSubmit={handleSubmit}>
        <label>Title <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Software Developer" required /></label>
        <label>Company <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. A Cooler Company" required /></label>
        <label>Start Date <input name="start_date" value={form.start_date} onChange={handleChange} placeholder="e.g. October 2022" required /></label>
        <label>End Date <input name="end_date" value={form.end_date} onChange={handleChange} placeholder="e.g. Present, August 2024" /></label>
        <label>Description <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your role and achievements..." /></label>
        <label>
          Logo URL
          <input name="logo" value={form.logo} onChange={handleChange} placeholder="https://example.com/logo.png" />
        </label>
        <LogoDropzone onUploaded={(url) => setForm({ ...form, logo: url })} />
        <div className="formButtons">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
        {saved && <p className="successMsg">Experience updated! Redirecting...</p>}
      </form>
    </div>
  );
}
