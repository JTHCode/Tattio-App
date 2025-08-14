import React, { useState } from 'react';
import './InputWizard.css';
import './Step3.css';

function Step3() {
  // Placeholder for generated image URL
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate fetching the generated image (replace with backend call later)
  const handleShowResult = () => {
    setLoading(true);
    setTimeout(() => {
      setImageUrl('/Images/WebsiteBG2.png'); // Replace with backend result
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="main-container1">
      <div className="step-title-container row">
        <p className="step-title-text">Your Tattoo</p>
      </div>
      <div className="step3-content content">
        <div className="result-image-container">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated Tattoo"
              className="generated-tattoo-image"
            />
          ) : (
            <div className="placeholder-image">
              <p className="sub-text">No image generated yet.</p>
            </div>
          )}
        </div>
        <div className="fin_buttons-container">
        <button className="fin-buttons" onClick={handleShowResult} disabled={loading}>
          <span className="sbmt-text">{loading ? 'Loading...' : 'Show Result'}</span>
        </button>
        <button className="fin-buttons strt-over-bttn" onClick={() => window.location.reload()}>
          <span className="sbmt-text">Start Over</span> 
        </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
