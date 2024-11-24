import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileList.css";

const FileList = () => {
  const [files, setFiles] = useState([]); // State to store the list of files
  const [error, setError] = useState(""); // State to handle errors
  const [message, setMessage] = useState(""); // Feedback messages

  // Fetch the list of uploaded files from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/upload");
        setFiles(response.data.files || []);
        setError("");
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to load uploaded files.");
      }
    };

    fetchFiles();
  }, []);

  // Handle file deletion
  const handleDelete = async (fileName) => {
    try {
      const response = await axios.delete(
        `https://your-backend-app.onrender.com/delete-upload/${fileName}`
      );
      setMessage(response.data.message || "File deleted successfully!");

      // Update the file list by removing the deleted file
      setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Failed to delete the file. Please try again.");
    }
  };

  return (
    <div className="file-list-container">
      <h2>Uploaded Files</h2>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
      {files.length > 0 ? (
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <a
                href={`https://your-backend-app.onrender.com/uploads/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="file-link"
              >
                {file}
              </a>
              <button
                className="delete-button"
                onClick={() => handleDelete(file)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;
