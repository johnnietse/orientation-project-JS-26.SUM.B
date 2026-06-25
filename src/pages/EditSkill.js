import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResume } from "../context";
import LogoDropzone from "../components/LogoDropzone";

export default function EditSkill() {
  const { id } = useParams();
  const { skills, setSkills, updateItem } = useResume();
  const navigate = useNavigate();
  const existing = skills.find((s) => s.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    proficiency: "",
    logo: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing)
      setForm({
        name: existing.name || "",
        proficiency: existing.proficiency || "",
        logo: existing.logo || "",
      });
  }, [existing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateItem("/resume/skill/", Number(id), form, setSkills, skills);
    } catch {
      setSkills(
        skills.map((i) => (i.id === Number(id) ? { ...i, ...form } : i))
      );
    }
    setSaved(true);
    setTimeout(() => navigate("/"), 800);
  }

  if (!existing) return <p>Skill not found.</p>;

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>
        &larr; Back to Resume
      </p>
      <h2>Edit Skill</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name{" "}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. JavaScript, Python"
            required
          />
        </label>
        <label>
          Proficiency{" "}
          <input
            name="proficiency"
            value={form.proficiency}
            onChange={handleChange}
            placeholder="e.g. 2-4 years, Expert, Beginner"
          />
        </label>
        <label>
          Logo URL
          <input
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />
        </label>
        <LogoDropzone onUploaded={(url) => setForm({ ...form, logo: url })} />
        <div className="formButtons">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
        {saved && <p className="successMsg">Skill updated! Redirecting...</p>}
      </form>
    </div>
  );
}
