import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../api";

export default function ChatGPT() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAsk() {
    setLoading(true);
    setResponse("");
    setError(null);
    try {
      const data = await post("/chatgpt", { prompt });
      setResponse(data.response || data.text || JSON.stringify(data));
    } catch {
      setError("Could not reach the ChatGPT backend. Make sure the Python server is running on port 8000.");
    }
    setLoading(false);
  }

  function handleDemo() {
    setResponse(
      "Jane is a results-driven software engineer with 3 years of experience building scalable web applications. " +
      "Proficient in JavaScript, React, and Python, she has led multiple full-stack projects from concept to deployment. " +
      "Passionate about clean code, mentoring juniors, and delivering measurable impact."
    );
  }

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>&larr; Back to Resume</p>
      <h2>ChatGPT</h2>
      <div className="backendNotice">
        &#9895; Requires the Python backend on port 8000. Click "Demo" to see a sample.
      </div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder={'e.g. "Write a summary for a software engineer with 3 years of experience"'}
      />
      <div className="formButtons">
        <button onClick={handleAsk} disabled={loading || !prompt}>
          {loading ? "Thinking..." : "Ask ChatGPT"}
        </button>
        <button onClick={handleDemo} className="secondaryBtn">
          Demo
        </button>
      </div>
      {error && <p className="errorMsg">{error}</p>}
      {response && (
        <div className="chatgptResponse">
          <h3>Response</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
