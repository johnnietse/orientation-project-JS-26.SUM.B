import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import AddExperience from "./pages/AddExperience";
import AddEducation from "./pages/AddEducation";
import AddSkill from "./pages/AddSkill";
import EditExperience from "./pages/EditExperience";
import EditEducation from "./pages/EditEducation";
import EditSkill from "./pages/EditSkill";
import Spellcheck from "./pages/Spellcheck";
import ChatGPT from "./pages/ChatGPT";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/experience/new" element={<AddExperience />} />
            <Route path="/education/new" element={<AddEducation />} />
            <Route path="/skill/new" element={<AddSkill />} />
            <Route path="/experience/:id/edit" element={<EditExperience />} />
            <Route path="/education/:id/edit" element={<EditEducation />} />
            <Route path="/skill/:id/edit" element={<EditSkill />} />
            <Route path="/spellcheck" element={<Spellcheck />} />
            <Route path="/chatgpt" element={<ChatGPT />} />
          </Routes>
        </div>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
