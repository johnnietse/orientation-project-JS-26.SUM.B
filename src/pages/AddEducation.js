import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context";
import LogoDropzone from "../components/LogoDropzone";

export default function AddEducation() {
  const { education, setEducation } = useResume();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await fetch("/resume/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (result.ok) {
        const data = await result.json();
        setEducation([...education, { ...form, id: data.id }]);
      }
    } catch {
      setEducation([...education, { ...form, id: Date.now() }]);
    }
    setSaved(true);
    setTimeout(() => navigate("/"), 800);
  }

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>
        &larr; Back to Resume
      </p>
      <h2>Add Education</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course{" "}
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            required
          />
        </label>
        <label>
          School{" "}
          <input
            name="school"
            value={form.school}
            onChange={handleChange}
            placeholder="e.g. NYU"
            required
          />
        </label>
        <label>
          Start Date{" "}
          <input
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            placeholder="e.g. October 2022"
            required
          />
        </label>
        <label>
          End Date{" "}
          <input
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            placeholder="e.g. August 2024"
          />
        </label>
        <label>
          Grade{" "}
          <input
            name="grade"
            value={form.grade}
            onChange={handleChange}
            placeholder="e.g. 86%, A, 3.8 GPA"
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
        {saved && <p className="successMsg">Education saved! Redirecting...</p>}
      </form>
    </div>
  );
}
