import { createContext, useContext, useState, useCallback } from "react";
import * as api from "./api";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
  });
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);

  const addItem = useCallback(async (endpoint, item, setter, list) => {
    const result = await api.post(endpoint, item);
    setter([...list, { ...item, id: result.id }]);
    return result;
  }, []);

  const updateItem = useCallback(async (endpoint, id, item, setter, list) => {
    await api.put(`${endpoint}${id}/`, item);
    setter(list.map((i) => (i.id === id ? { ...i, ...item } : i)));
  }, []);

  const deleteItem = useCallback(async (endpoint, id, setter, list) => {
    await api.del(`${endpoint}${id}/`);
    setter(list.filter((i) => i.id !== id));
  }, []);

  const reorderItems = useCallback(async (endpoint, id, newPosition, setter, list) => {
    const updated = [...list];
    const idx = updated.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const [item] = updated.splice(idx, 1);
    updated.splice(newPosition, 0, item);
    setter(updated);
    await api.put(`${endpoint}${id}/`, { position: newPosition });
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const [exp, edu, skillsData] = await Promise.all([
        api.get("/resume/experience"),
        api.get("/resume/education"),
        api.get("/resume/skill"),
      ]);
      setExperience(Array.isArray(exp) ? exp : []);
      setEducation(Array.isArray(edu) ? edu : []);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
    } catch (e) {
      console.warn("Could not fetch data from server, using local state", e);
    }
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        userInfo,
        setUserInfo,
        experience,
        setExperience,
        education,
        setEducation,
        skills,
        setSkills,
        addItem,
        updateItem,
        deleteItem,
        reorderItems,
        fetchAll,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
}
