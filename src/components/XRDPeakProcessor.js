import React, { useState } from "react";
import axios from "axios";

const XRDPeakProcessor = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [downloadLinks, setDownloadLinks] = useState(null);

  // State for other input parameters
  const [thetaColumn, setThetaColumn] = useState("");
  const [intensityColumn, setIntensityColumn] = useState("");
  const [minTheta, setMinTheta] = useState(20);
  const [maxTheta, setMaxTheta] = useState(80);
  const [minIntensity, setMinIntensity] = useState(200);
  const [maxIntensity, setMaxIntensity] = useState(20000);
  const [maxPeaks, setMaxPeaks] = useState(11);
  const [height, setHeight] = useState(200);
  const [distance, setDistance] = useState(5);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a .csv file");
      return;
    }

    const formData = new FormData();
    formData.append("input_file", file);
    formData.append("theta_column", thetaColumn);
    formData.append("intensity_column", intensityColumn);
    formData.append("min_theta", minTheta);
    formData.append("max_theta", maxTheta);
    formData.append("min_intensity", minIntensity);
    formData.append("max_intensity", maxIntensity);
    formData.append("max_peaks", maxPeaks);
    formData.append("height", height);
    formData.append("distance", distance);

    try {
      setIsProcessing(true);
      setResponseMessage(null);
      setDownloadLinks(null);

      // Send file and parameters to server for processing
      const response = await axios.post(
        "http://localhost:5000/process-xrd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If successful, display download links
      setIsProcessing(false);
      setDownloadLinks(response.data);
    } catch (error) {
      setIsProcessing(false);
      setResponseMessage("Error processing the file.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>XRD Data Processing</h2>
      <form onSubmit={handleSubmit}>
        {/* File Upload */}
        <div style={{ marginBottom: "10px" }}>
          <label>Input File (.csv):</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            required
          />
        </div>

        {/* Columns for theta and intensity */}
        <div style={{ marginBottom: "10px" }}>
          <label>Theta Column Name:</label>
          <input
            type="text"
            value={thetaColumn}
            onChange={(e) => setThetaColumn(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Intensity Column Name:</label>
          <input
            type="text"
            value={intensityColumn}
            onChange={(e) => setIntensityColumn(e.target.value)}
            required
          />
        </div>

        {/* Min and Max Theta */}
        <div style={{ marginBottom: "10px" }}>
          <label>Min Theta:</label>
          <input
            type="number"
            value={minTheta}
            onChange={(e) => setMinTheta(e.target.value)}
            min="0"
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Max Theta:</label>
          <input
            type="number"
            value={maxTheta}
            onChange={(e) => setMaxTheta(e.target.value)}
            min="0"
            required
          />
        </div>

        {/* Min and Max Intensity */}
        <div style={{ marginBottom: "10px" }}>
          <label>Min Intensity:</label>
          <input
            type="number"
            value={minIntensity}
            onChange={(e) => setMinIntensity(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Max Intensity:</label>
          <input
            type="number"
            value={maxIntensity}
            onChange={(e) => setMaxIntensity(e.target.value)}
            required
          />
        </div>

        {/* Max Peaks */}
        <div style={{ marginBottom: "10px" }}>
          <label>Max Peaks:</label>
          <input
            type="number"
            value={maxPeaks}
            onChange={(e) => setMaxPeaks(e.target.value)}
            min="1"
            required
          />
        </div>

        {/* Height */}
        <div style={{ marginBottom: "10px" }}>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>

        {/* Distance */}
        <div style={{ marginBottom: "10px" }}>
          <label>Distance:</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Process Data"}
        </button>
      </form>

      {responseMessage && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>{responseMessage}</h3>
        </div>
      )}

      {downloadLinks && (
        <div style={{ marginTop: "20px" }}>
          <h3>Download Processed Files:</h3>
          <ul>
            <li>
              <a href={downloadLinks.image} download>
                Download Plot Image (PNG)
              </a>
            </li>
            <li>
              <a href={downloadLinks.pdf} download>
                Download Plot PDF
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default XRDPeakProcessor;
