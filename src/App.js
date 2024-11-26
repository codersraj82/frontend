import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import Navbar from "./components/Navbar";
import FileList from "./components/FileList";
import FileProcessor from "./components/FileProcessor";
// import FileListWithDelete from "./components/FileListWithDelete";

import "./App.css";
function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <header className="app-header">
        <h1>XRD-analysis App</h1>
      </header>
      <Navbar />
      <main className="app-main">
        {/* <p>Backend Message: {message}</p> */}
        <FileUpload />
        {/* <FileList /> */}
        <FileProcessor />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 xrd-analysis app</p>
      </footer>
    </>
  );
}

export default App;
