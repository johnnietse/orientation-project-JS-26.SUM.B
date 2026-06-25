import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context";
import LogoDropzone from "../components/LogoDropzone";

export default function AddSkill() {
  const { skills, setSkills } = useResume();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    proficiency: "",
    logo: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch("/resume/skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (result.ok) {
        const data = await result.json();
        setSkills([...skills, { ...form, id: data.id }]);
      }
    } catch {
      setSkills([...skills, { ...form, id: Date.now() }]);
    }
    setSaved(true);
    setTimeout(() => navigate("/"), 800);
  }

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>
        &larr; Back to Resume
      </p>
      <h2>Add Skill</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name{" "}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. JavaScript, Python, UX Design"
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
        {saved && <p className="successMsg">Skill saved! Redirecting...</p>}
      </form>
    </div>
  );
}
