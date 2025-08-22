import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import './SliderControl.css';

function SliderControl({ id, label, value, onChange, description, isEnabled, onToggle }) {
  const handleValueChange = (newValue) => {
    onChange({ target: { name: id, value: newValue[0] } });
  };

  return (
    <div className="slider-group">
      <div className="slider-label-container">
        <Checkbox.Root
          className="checkbox-root"
          id={`${id}-checkbox`}
          checked={isEnabled}
          onCheckedChange={(checked) => onToggle(id, checked)}
        >
          <Checkbox.Indicator className="checkbox-indicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label htmlFor={id} className="slider-label">{label}</label>
      </div>

      <div className={`slider-wrapper ${!isEnabled ? 'disabled' : ''}`}>
        <Slider.Root
          className="slider-root"
          value={[value]}
          onValueChange={(newValue) =>
            onChange({ target: { name: id, value: newValue[0] } })
          }
          max={100}
          step={1}
          name={id}
          disabled={!isEnabled}
        >
          <Slider.Track className="slider-track">
            <Slider.Range className="slider-range" />
          </Slider.Track>
          <Slider.Thumb className="slider-thumb" aria-label={label} />
        </Slider.Root>
        {description && <small>{description}</small>}
      </div>
    </div>
  );
}

export default SliderControl;
