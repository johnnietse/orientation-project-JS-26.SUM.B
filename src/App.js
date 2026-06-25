import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context";
import Home from "./pages/Home";
import AddEducation from "./pages/AddEducation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education/new" element={<AddEducation />} />
          </Routes>
        </div>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
