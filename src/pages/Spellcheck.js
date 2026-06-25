import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../api";

export default function Spellcheck() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheck() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await post("/spellcheck", { text });
      setResult(data);
    } catch {
      setError("Could not reach the spellcheck backend. Make sure the Python server is running on port 8000.");
    }
    setLoading(false);
  }

  function handleDemo() {
    setResult({
      corrections: [
        { original: "recieve", corrected: "receive" },
        { original: "acheive", corrected: "achieve" },
        { original: "neccessary", corrected: "necessary" },
      ],
    });
  }

  return (
    <div className="page">
      <p className="backLink" onClick={() => navigate("/")}>&larr; Back to Resume</p>
      <h2>Spellcheck</h2>
      <div className="backendNotice">
        &#9895; Requires the Python backend on port 8000. Click "Demo" to see a sample.
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your resume text here..."
      />
      <div className="formButtons">
        <button onClick={handleCheck} disabled={loading || !text}>
          {loading ? "Checking..." : "Check Spelling"}
        </button>
        <button onClick={handleDemo} className="secondaryBtn">
          Demo
        </button>
      </div>
      {error && <p className="errorMsg">{error}</p>}
      {result && (
        <div className="spellcheckResult">
          <h3>Suggestions</h3>
          {result.corrections && result.corrections.length > 0 ? (
            <ul>
              {result.corrections.map((c, i) => (
                <li key={i}>
                  <strong>{c.original}</strong> &rarr; {c.corrected}
                </li>
              ))}
            </ul>
          ) : (
            <p>No spelling issues found!</p>
          )}
        </div>
      )}
    </div>
  );
}
