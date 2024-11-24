import React, { useEffect, useState } from "react";
import axios from "axios";
import TextFileDisplay from "./TextFileDisplay"; // Import the TextFileDisplay component
import "./FileList.css";

const FileList = () => {
  const [files, setFiles] = useState([]); // State to store the list of files
  const [error, setError] = useState(""); // State for errors
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file content
  const [clearContent, setClearContent] = useState(false);
  const BASE_URL =
    /* "https://xrdbackend.onrender.com "; */ "http://localhost:5000"; // Backend URL

  // Fetch the file list from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        "https://xrdbackend.onrender.com/upload "
      ); //(`${BASE_URL}/upload`);
      setFiles(response.data); // Update state with the file list
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Unable to fetch files. Please try again.");
    }
  };

  // Fetch files on component mount
  // useEffect(() => {
  //   fetchFiles();
  // }, []);

  // Delete a file
  const deleteFile = async (fileName) => {
    try {
      await axios.delete(`https://xrdbackend.onrender.com/upload/${fileName}`);
      setFiles(files.filter((file) => file !== fileName)); // Update state to remove the deleted file
      setError(""); // Clear any previous errors
      if (selectedFile === fileName) {
        setSelectedFile(null); // If the deleted file was selected, clear the displayed content
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Unable to delete file. Please try again.");
    }
  };

  // Handle file selection and fetch content
  const handleFileSelect = async (fileName) => {
    try {
      const response = await axios.get(`${BASE_URL}/uploads/${fileName}`, {
        responseType: "text", // Ensure the response is treated as text
      });
      setSelectedFile({ name: fileName, content: response.data });
    } catch (err) {
      console.error("Error reading file content:", err);
      setError("Unable to read file content. Please try again.");
    }
  };

  return (
    <div className="file-list-container">
      <button onClick={fetchFiles}>Uploaded Files</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {files.length > 0 ? (
          files.map((file, index) => (
            <li key={index} className="file-list-item">
              <button onClick={() => handleFileSelect(file)}>{file}</button>
              <button
                onClick={() => deleteFile(file)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p> upload a file or click to see uploaded files.</p>
        )}
      </ul>
      <div>
        {selectedFile && (
          <div className="file-content-container">
            <h3>File Content: {selectedFile.name}</h3>
            <TextFileDisplay content={selectedFile.content} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileList;
