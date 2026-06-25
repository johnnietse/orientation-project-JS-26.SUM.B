import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context";
import ResumeSection from "../components/ResumeSection";
import ExportPdf from "../components/ExportPdf";

export default function Home() {
  const {
    userInfo,
    experience,
    setExperience,
    education,
    setEducation,
    skills,
    setSkills,
    deleteItem,
    fetchAll,
  } = useResume();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  function handleDelete(type, id) {
    if (!window.confirm("Delete this item? It will be removed from your resume.")) return;

    const endpoint =
      type === "experience" ? "/resume/experience/"
      : type === "education" ? "/resume/education/"
      : "/resume/skill/";

    const setter =
      type === "experience" ? setExperience
      : type === "education" ? setEducation
      : setSkills;

    const list =
      type === "experience" ? experience
      : type === "education" ? education
      : skills;

    deleteItem(endpoint, id, setter, list).catch(() => {
      setter(list.filter((i) => i.id !== id));
    });

    setMsg(`${type.charAt(0).toUpperCase() + type.slice(1)} item removed.`);
    setTimeout(() => setMsg(null), 2000);
  }

  function handleReorder(type, reordered) {
    if (type === "experience") setExperience(reordered);
    else if (type === "education") setEducation(reordered);
    else setSkills(reordered);
  }

  return (
    <div>
      {msg && <div className="toast">{msg}</div>}

      <div className="topBar">
        <div className="userInfoStrip">
          {userInfo.name ? (
            <>
              <strong>{userInfo.name}</strong>
              {userInfo.email && <span>{userInfo.email}</span>}
              {userInfo.phone && <span>{userInfo.phone}</span>}
            </>
          ) : (
            <span>Add your info at the top of the resume</span>
          )}
          <button onClick={() => navigate("/user-info")} className="editInfoBtn">
            {userInfo.name ? "Edit Info" : "Add Info"}
          </button>
        </div>
        <div className="navButtons">
          <button onClick={() => navigate("/spellcheck")}>Spellcheck</button>
          <button onClick={() => navigate("/chatgpt")}>ChatGPT</button>
        </div>
      </div>

      <ResumeSection
        title="Experience"
        type="experience"
        items={experience}
        onDelete={(id) => handleDelete("experience", id)}
        onReorder={(reordered) => handleReorder("experience", reordered)}
      />

      <ResumeSection
        title="Education"
        type="education"
        items={education}
        onDelete={(id) => handleDelete("education", id)}
        onReorder={(reordered) => handleReorder("education", reordered)}
      />

      <ResumeSection
        title="Skills"
        type="skill"
        items={skills}
        onDelete={(id) => handleDelete("skill", id)}
        onReorder={(reordered) => handleReorder("skill", reordered)}
      />

      <ExportPdf
        userInfo={userInfo}
        experience={experience}
        education={education}
        skills={skills}
      />
    </div>
  );
}
