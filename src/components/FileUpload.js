import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Must match the `upload.single("file")` key in the backend

    try {
      setMessage("");
      setUploadProgress(0);

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} className="file-upload" />
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
      {uploadProgress > 0 && (
        <p className="upload-progress upload-progress-bar">
          Upload Progress: {uploadProgress}%
        </p>
      )}
      {message && <p className="message success ">{message}</p>}
    </div>
  );
};

export default FileUpload;
