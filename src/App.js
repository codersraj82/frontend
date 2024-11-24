import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import Navbar from "./components/Navbar";
import "./App.css";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the backend
    axios
      .get("http://localhost:5000/")
      .then((response) => setMessage(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>XRD-analysis App</h1>
      </header>
      <Navbar />
      <main className="app-main">
        {/* <p>Backend Message: {message}</p> */}
        <FileUpload />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 YourAppName</p>
      </footer>
    </>
  );
}

export default App;
