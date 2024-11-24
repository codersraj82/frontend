import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { API_BASE_URL } from "../config";

const FileUpload = () => {
  const [file, setFile] = useState(null); // File state
  const [uploadProgress, setUploadProgress] = useState(0); // Progress state
  const [message, setMessage] = useState(""); // Feedback message state

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(""); // Clear previous messages
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append file for upload

    try {
      setMessage("");
      setUploadProgress(0);

      // Axios POST request to upload the file
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted); // Update progress
        },
      });

      setMessage(response.data.message || "File uploaded successfully!");
      setFile(null); // Reset file input
      setUploadProgress(0); // Reset progress
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="file-upload"
        accept="*"
      />
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>

      {/* Progress and Message Feedback */}
      {uploadProgress > 0 && (
        <p className="upload-progress">Upload Progress: {uploadProgress}%</p>
      )}
      {message && (
        <p className={`message ${uploadProgress === 0 ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
