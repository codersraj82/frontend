import React, { useState } from "react";
import axios from "axios";

export default function FileReader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = async (fileName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/upload/${fileName}`,
        {
          responseType: "text", // Ensure the response is treated as text
        }
      );
      setSelectedFile({ name: fileName, content: response.data });
    } catch (err) {
      console.error("Error reading file content:", err);
      setError("Unable to read file content. Please try again.");
    }
  };

  return (
    <div>
      <h1>File Reader</h1>
      <button onClick={() => handleFileSelect("exampleFile.txt")}>
        Fetch File Content
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedFile && (
        <div>
          <h3>File Name: {selectedFile.name}</h3>
          <pre>{selectedFile.content}</pre>
        </div>
      )}
    </div>
  );
}
