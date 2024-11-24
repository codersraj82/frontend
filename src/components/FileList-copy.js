import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileList.css";
const FileList = () => {
  const [files, setFiles] = useState([]); // State to store the list of files
  const [error, setError] = useState(""); // State for errors
  const BASE_URL = "http://localhost:5000"; // Use the correct backend base URL

  // Fetch the file list from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/files`);
      setFiles(response.data); // Update state with the file list
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Unable to fetch files. Please try again.");
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  // Delete a file
  const deleteFile = async (fileName) => {
    try {
      await axios.delete(`${BASE_URL}/delete-upload/${fileName}`);
      setFiles(files.filter((file) => file !== fileName)); // Update state to remove the deleted file
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Unable to delete file. Please try again.");
    }
  };

  return (
    <div>
      <button>Uploaded Files</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {files.length > 0 ? (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a
                href={`${BASE_URL}/uploads/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file}
              </a>
              <button
                onClick={() => deleteFile(file)}
                style={{ marginLeft: "10px", color: "red" }}
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
