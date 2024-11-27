import React from "react";

const FileViewerComponent = ({ imageUrl, pdfUrl, onClose }) => {
  return (
    <div className="file-viewer">
      <div className="file-viewer-header">
        <button
          onClick={onClose}
          style={{ position: "relative", right: "10px", top: "10px" }}
        >
          Close
        </button>
      </div>

      <div className="file-viewer-content">
        {/* Display Image */}
        {imageUrl && (
          <div>
            <h3>Image</h3>
            <img
              src={imageUrl}
              alt="Processed Image"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* Display PDF */}
        {pdfUrl && (
          <div>
            <h3>PDF</h3>
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title="PDF Viewer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewerComponent;
