import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResume } from "../context";
import LogoDropzone from "../components/LogoDropzone";

export default function EditEducation() {
  const { id } = useParams();
  const { education, setEducation, updateItem } = useResume();
  const navigate = useNavigate();
  const existing = education.find((e) => e.id === Number(id));

  const [form, setForm] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing)
      setForm({
        course: existing.course || "",
        school: existing.school || "",
        start_date: existing.start_date || "",
        end_date: existing.end_date || "",
        grade: existing.grade || "",
        logo: existing.logo || "",
      });
  }, [existing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateItem(
        "/resume/education/",
        Number(id),
        form,
        setEducation,
        education
      );
    } catch {
      setEducation(
        education.map((i) => (i.id === Number(id) ? { ...i, ...form } : i))
      );
    }
    setSaved(true);
    setTimeout(() => navigate("/"), 800);
  }

  if (!existing) return <p>Education not found.</p>;

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>
        &larr; Back to Resume
      </p>
      <h2>Edit Education</h2>
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
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
        {saved && (
          <p className="successMsg">Education updated! Redirecting...</p>
        )}
      </form>
    </div>
  );
}
