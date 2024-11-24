import React from "react";
import "./TextFileDisplay.css";

const TextFileDisplay = ({ content }) => {
  return (
    <div className="file-content">
      <pre>{content}</pre> {/* Display file content as text */}
    </div>
  );
};

export default TextFileDisplay;
