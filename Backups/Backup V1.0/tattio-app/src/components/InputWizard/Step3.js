import React, { useState } from 'react';
import './InputWizard.css';
import './Step3.css';
import SliderControl from './SliderControl';

function Step3({ onNext }) {
  const [sliders, setSliders] = useState({
    complexity: 50,
    contrast: 50,
    shading: 50,
    lineThickness: 50,
    colorComplexity: 50,
    colorRange: 50,
  });

  const [slidersEnabled, setSlidersEnabled] = useState({
    complexity: true,
    contrast: true,
    shading: true,
    lineThickness: true,
    colorComplexity: true,
    colorRange: true,
  });

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setSliders(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  const handleSliderToggle = (id, checked) => {
    setSlidersEnabled(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <div className="main-container1">
      <div className="step-title-container row">
        <p className="step-title-text">Advanced Options</p>
        <p className="lexend-steps step-title-subtext">Optional</p>
      </div>

      <div className="step3-container">
        <div className="sliders-section">
          <SliderControl
            id="complexity"
            label="Complexity/Detail"
            value={sliders.complexity}
            onChange={handleSliderChange}
            isEnabled={slidersEnabled.complexity}
            onToggle={handleSliderToggle}
          />
          <SliderControl
            id="contrast"
            label="Contrast"
            value={sliders.contrast}
            onChange={handleSliderChange}
            isEnabled={slidersEnabled.contrast}
            onToggle={handleSliderToggle}
          />
          <SliderControl
            id="shading"
            label="Shading Intensity"
            value={sliders.shading}
            onChange={handleSliderChange}
            isEnabled={slidersEnabled.shading}
            onToggle={handleSliderToggle}
          />
          <SliderControl
            id="lineThickness"
            label="Line Thickness"
            value={sliders.lineThickness}
            onChange={handleSliderChange}
            isEnabled={slidersEnabled.lineThickness}
            onToggle={handleSliderToggle}
          />
          <SliderControl
            id="colorComplexity"
            label="Color Complexity"
            value={sliders.colorComplexity}
            onChange={handleSliderChange}
            isEnabled={slidersEnabled.colorComplexity}
            onToggle={handleSliderToggle}
          />
          <SliderControl
            id="colorRange"
            label="Color Range"
            value={sliders.colorRange}
            onChange={handleSliderChange}
            isEnabled={slidersEnabled.colorRange}
            onToggle={handleSliderToggle}
          />
        </div>

        <div className="example-image-section">
          <p className="example-title">Example Tattoo</p>
          <div className="image-placeholder" id="example-image">
            {/* Insert your dynamic image here based on slider values */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3;
