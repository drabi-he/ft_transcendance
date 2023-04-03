import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalProvider } from "./context/GlobalContext";
import TitleBar from "./components/TitleBar";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Router>
          <NavBar />
          <div className="internal">
            <TitleBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
