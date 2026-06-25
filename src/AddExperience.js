import React, { useState } from "react";

function AddExperience({ onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/resume/experience", {
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
      <h2>Add New Experience</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="text"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Logo URL:</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddExperience;
