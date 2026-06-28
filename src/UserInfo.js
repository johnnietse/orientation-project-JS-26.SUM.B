import React, { useState } from "react";

function UserInfo({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/resume/user-info", {
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
      <h2>Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. jane@example.com"
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 123-4567"
          />
        </div>
        <div>
          <label>Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={4}
            placeholder="Brief professional summary..."
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

export default UserInfo;
