import React, { useState } from "react";

function AddSkill({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    proficiency: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/resume/skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (onBack) onBack();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Add New Skill</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. JavaScript, Python, UX Design"
            required
          />
        </div>
        <div>
          <label>Proficiency:</label>
          <input
            type="text"
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            placeholder="e.g. 2-4 years, Expert, Beginner"
          />
        </div>
        <div>
          <label>Logo URL:</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddSkill;
