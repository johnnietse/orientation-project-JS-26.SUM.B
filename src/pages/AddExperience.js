import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context";
import LogoDropzone from "../components/LogoDropzone";

export default function AddExperience() {
  const { experience, setExperience } = useResume();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch("/resume/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (result.ok) {
        const data = await result.json();
        setExperience([...experience, { ...form, id: data.id }]);
      }
    } catch {
      setExperience([...experience, { ...form, id: Date.now() }]);
    }
    setSaved(true);
    setTimeout(() => navigate("/"), 800);
  }

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>&larr; Back to Resume</p>
      <h2>Add Experience</h2>
      <form onSubmit={handleSubmit}>
        <label>Title <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Software Developer" required /></label>
        <label>Company <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. A Cooler Company" required /></label>
        <label>Start Date <input name="start_date" value={form.start_date} onChange={handleChange} placeholder="e.g. October 2022" required /></label>
        <label>End Date <input name="end_date" value={form.end_date} onChange={handleChange} placeholder="e.g. Present, August 2024" /></label>
        <label>Description <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your role, responsibilities, and key achievements..." /></label>
        <label>
          Logo URL
          <input name="logo" value={form.logo} onChange={handleChange} placeholder="https://example.com/logo.png" />
        </label>
        <LogoDropzone onUploaded={(url) => setForm({ ...form, logo: url })} />
        <div className="formButtons">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
        {saved && <p className="successMsg">Experience saved! Redirecting...</p>}
      </form>
    </div>
  );
}
