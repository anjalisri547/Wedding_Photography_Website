import React, { useState } from "react";
import axios from "axios";

const SmartTagging = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing photo");
    }
  };

  return (
    <div>
      <h2>Smart Photo Tagging</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Analyze</button>

      {result && (
        <div>
          <h3>Detected Faces: {result.faces.length}</h3>
          <h3>Detected Labels:</h3>
          <ul>
            {result.labels.map((label, idx) => (
              <li key={idx}>{label.description} ({(label.score*100).toFixed(1)}%)</li>
            ))}
          </ul>
          <h3>Detected Landmarks:</h3>
          <ul>
            {result.landmarks.map((lm, idx) => (
              <li key={idx}>{lm.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartTagging;
