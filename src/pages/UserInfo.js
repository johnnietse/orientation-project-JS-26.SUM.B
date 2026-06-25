import { useResume } from "../context";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const { userInfo, setUserInfo } = useResume();
  const navigate = useNavigate();

  function handleChange(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>&larr; Back to Resume</p>
      <h2>Your Information</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <label>
          Name
          <input name="name" value={userInfo.name} onChange={handleChange} placeholder="e.g. Jane Doe" />
        </label>
        <label>
          Email
          <input name="email" value={userInfo.email} onChange={handleChange} placeholder="e.g. jane@example.com" />
        </label>
        <label>
          Phone
          <input name="phone" value={userInfo.phone} onChange={handleChange} placeholder="e.g. +1 (555) 123-4567" />
        </label>
        <label>
          Summary
          <textarea name="summary" value={userInfo.summary} onChange={handleChange} rows={4} placeholder="Brief professional summary — e.g. Results-driven software engineer with 3 years of experience..." />
        </label>
        <div className="formButtons">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
