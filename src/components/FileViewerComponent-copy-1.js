import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const FileViewerComponent = ({ imageUrl, pdfUrl }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Project Output</h1>

      {/* Displaying the Image */}
      {imageUrl && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Image Output</h3>
          <img
            src={imageUrl}
            alt="Project Output"
            style={{ width: "100%", maxWidth: "800px", height: "auto" }}
          />
        </div>
      )}

      {/* Displaying the PDF */}
      {pdfUrl && (
        <div style={{ marginBottom: "20px" }}>
          <h3>PDF Output</h3>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}
          >
            <div style={{ height: "600px" }}>
              <Viewer fileUrl={pdfUrl} />
            </div>
          </Worker>
        </div>
      )}
    </div>
  );
};

export default FileViewerComponent;
