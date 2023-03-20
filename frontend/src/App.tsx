import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalProvider } from "./context/GlobalContext";
import TitleBar from "./components/TitleBar";
import NavBar from "./components/NavBar";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <NavBar />
        <TitleBar />
      </div>
    </GlobalProvider>
  );
}

export default App;
