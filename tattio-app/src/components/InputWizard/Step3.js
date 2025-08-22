import React, { useState } from 'react';
import './InputWizard.css';
import './Step3.css';

function Step3({ getTattooData, entryAnimation, animate }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleShowResult = async () => {
    try {
      setLoading(true);
      const tattooData = getTattooData();
      // console.log('Data to be sent to backend:', tattooData);

      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(apiUrl + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tattooData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
        setDownloadUrl(data.downloadUrl);
        console.log('Download URL:', data.downloadUrl); // For debugging
      } else {
        console.error('Error generating image:', data.error);
        alert(`Error: ${data.error || 'Failed to generate image'}. Please ensure the Flask backend is running on port 5000.`);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.message.includes('Failed to fetch')) {
        alert('Connection failed. Please ensure the Flask backend is running on port 5000 (python main.py)');
      } else {
        alert(`Error: ${error.message}. Please ensure the Flask backend is running on port 5000.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'your-tattoo.png'; // Download file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`main-container1 ${animate ? 'fade-slide-out' : ''} ${entryAnimation ? 'fade-slide-in' : ''}`}>
      <div className="step-title-container row">
        <p className="step-title-text">Your Tattoo</p>
      </div>
      <div className="step3-content content">
        <div className="result-image-container">
          {loading ? (
            <div className="loader">
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Generated Tattoo"
              className="generated-tattoo-image"
            />
          ) : (
            <div className="placeholder-image">
              <p className="sub-text">Clikc "Show Result" to generate tattoo.</p>
            </div>
          )}
        </div>
        <div className="fin_buttons-container">
          {imageUrl && (
            <div
              className="download-icon"
              onClick={handleDownload}
              title="Download"
            >
              <svg width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path className='dl-arrow' fill="var(--accent-color)" stroke="var(--accent-color)" d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" />
                  <path className='dl-base' fill="var(--accent-color)" stroke="var(--accent-color)" d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" />
                </g>
              </svg>
            </div>
          )}
          <button className="fin-buttons submit-bttn" onClick={handleShowResult} disabled={loading}>
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
