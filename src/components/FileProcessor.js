import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./FileList.css";
import "./FileViewerComponent.js";
import FileViewerComponent from "./FileViewerComponent.js";

const FileProcessor = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [outputFiles, setOutputFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  // const [minTheta, setMinTheta] = useState(20);
  const minTheta = useRef(10);
  const maxTheta = useRef(90);
  const minPeakIntensity = useRef(200);
  const thetaDistance = useRef(50);
  // User filteration

  // Change to your backend URL when deployed.

  // const BASE_URL = "http://localhost:5000";
  // const BASE_URL = "https://xrd-backend.onrender.com";
  const BASE_URL = "https://xrd-backend.up.railway.app";

  // Fetch uploaded files
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/upload`);
      setUploadedFiles(response.data);
    } catch (err) {
      console.error("Error fetching uploaded files:", err);
      setMessage("Unable to fetch uploaded files.");
    }
  };

  // Fetch output files
  const fetchOutputFiles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/outputs`);
      setOutputFiles(response.data);
    } catch (err) {
      console.error("Error fetching output files:", err);
      setMessage("Unable to fetch output files.");
    }
  };

  // Process a file
  const processFile = async (
    fileName,
    min_theta,
    max_theta,
    min_peak_intensity,
    theta_distance
  ) => {
    try {
      setMessage("Processing file...");
      await axios.post(`${BASE_URL}/process/${fileName}`, {
        min_theta,
        max_theta,
        min_peak_intensity,
        theta_distance,
      });
      setMessage("File processed successfully!");
      fetchOutputFiles(); // Refresh the output files list
    } catch (err) {
      console.error("Error processing file:", err);
      setMessage("Failed to process file.");
    }
  };

  // Download a file
  const downloadFile = (fileName) => {
    window.open(`${BASE_URL}/outputs/${fileName}`, "_blank");
  };

  // Delete a file
  const deleteFile = async (fileName, isOutputFile) => {
    const endpoint = isOutputFile
      ? `/outputs/${fileName}`
      : `/upload/${fileName}`;
    try {
      await axios.delete(`${BASE_URL}${endpoint}`);
      setMessage(`${fileName} deleted successfully!`);
      isOutputFile ? fetchOutputFiles() : fetchUploadedFiles();
    } catch (err) {
      console.error("Error deleting file:", err);
      setMessage("Failed to delete file.");
    }
  };

  // Set selected file for viewing
  const handleViewFile = (fileName) => {
    // Assuming output files are stored with their image and pdf names
    const imageUrl = `${BASE_URL}/outputs/${fileName.replace(".pdf", ".png")}`; // Replace .pdf with .jpg if available
    const pdfUrl = `${BASE_URL}/outputs/${fileName}`;

    setSelectedFile({ imageUrl, pdfUrl });
  };

  // Close the viewer
  const handleCloseViewer = () => {
    setSelectedFile(null);
  };

  function handleMinTheta(min_theta) {
    minTheta.current = min_theta;
  }
  function handleMaxTheta(max_theta) {
    maxTheta.current = max_theta;
  }
  function handleMinPeakIntensity(min_peak_intensity) {
    minPeakIntensity.current = min_peak_intensity;
  }
  function handlethetaDistance(theta_distance) {
    thetaDistance.current = theta_distance;
  }

  useEffect(() => {
    fetchUploadedFiles();
    fetchOutputFiles();
  }, []);

  return (
    <>
      <div className="file-list-container">
        <h2>CSV File Processor</h2>

        <button
          onClick={() => {
            fetchUploadedFiles();
            fetchOutputFiles();
          }}
        >
          Refresh
        </button>
        <h3>Uploaded Files</h3>
        {uploadedFiles.length > 0 ? (
          <ul>
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {message && <p>{message}</p>}
                <p>{file}</p>
                {/* Insert user filter data */}
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => handleMinTheta(e.target.value)}
                  placeholder="Enter min theta"
                />
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => handleMaxTheta(e.target.value)}
                  placeholder="Enter max theta"
                />
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => handleMinPeakIntensity(e.target.value)}
                  placeholder="Enter min peak intensity value"
                />
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => handlethetaDistance(e.target.value)}
                  placeholder="Enter Theta distance"
                />

                <button
                  onClick={() =>
                    processFile(
                      file,
                      minTheta,
                      maxTheta,
                      minPeakIntensity,
                      thetaDistance
                    )
                  }
                >
                  Process
                </button>
                <button onClick={() => deleteFile(file, false)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No uploaded files available.</p>
        )}

        <h3>Output Files</h3>
        {outputFiles.length > 0 ? (
          <ul>
            {outputFiles.map((file, index) => (
              <li key={index}>
                {file}
                <button onClick={() => downloadFile(file)}>Download</button>
                <button onClick={() => deleteFile(file, true)}>Delete</button>
                {/* View Button */}
                <button onClick={() => handleViewFile(file)}>View</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No output files available.</p>
        )}
      </div>

      {/* FileViewerComponent will be shown when a file is selected */}
      {selectedFile && (
        <div style={{ marginTop: "20px" }}>
          <FileViewerComponent
            imageUrl={selectedFile.imageUrl}
            pdfUrl={selectedFile.pdfUrl}
            onClose={handleCloseViewer} // Pass the close function to FileViewerComponent
          />
        </div>
      )}
    </>
  );
};

export default FileProcessor;
