import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
// import Scan from "./pages/Scan";
import NoteBook from "./pages/NoteBook";
import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Scan />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Folders/Notebook" element={<NoteBook />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
