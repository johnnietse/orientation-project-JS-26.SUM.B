import React, { useState } from "react";
import "./App.css";
import AddExperience from "./AddExperience";
import UserInfo from "./UserInfo";

function App() {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

  if (isAddingExperience) {
    return (
      <div className="App">
        <AddExperience onBack={() => setIsAddingExperience(false)} />
      </div>
    );
  }

  if (isEditingUserInfo) {
    return (
      <div className="App">
        <UserInfo onBack={() => setIsEditingUserInfo(false)} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Your Information</h2>
        <p>User Info Placeholder</p>
        <button onClick={() => setIsEditingUserInfo(true)}>Edit Info</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button onClick={() => setIsAddingExperience(true)}>
          Add Experience
        </button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <p>Skill Placeholder</p>
        <button>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;
