import React, { useState } from 'react';
import './InputWizard.css';
import './Step1.css'

const styles = [
  { id: "abstract", src: "/Images/style_buttons/abstract.png", alt: "Abstract" },
  { id: "amertrad", src: "/Images/style_buttons/amertrad.png", alt: "American Traditional" },
  { id: "anime", src: "/Images/style_buttons/anime.png", alt: "Anime" },
  { id: "biomech", src: "/Images/style_buttons/biomech.png", alt: "Biomechanical" },
  { id: "blackwork", src: "/Images/style_buttons/blackwork.png", alt: "Blackwork" },
  { id: "fineline", src: "/Images/style_buttons/fineline.png", alt: "Fine Line" },
  { id: "holo", src: "/Images/style_buttons/holo.png", alt: "Holographic" },
  { id: "letter", src: "/Images/style_buttons/letter.png", alt: "Lettering" },
  { id: "minimal", src: "/Images/style_buttons/minimal.png", alt: "Minimalist" },
  { id: "neg", src: "/Images/style_buttons/neg.png", alt: "Negative Space" },
  { id: "newschool", src: "/Images/style_buttons/newschool.png", alt: "New School" },
  { id: "psych", src: "/Images/style_buttons/psych.png", alt: "Psychedelic" },
  { id: "realism", src: "/Images/style_buttons/realism.png", alt: "Realism" },
  { id: "sketch", src: "/Images/style_buttons/sketch.png", alt: "Sketch" },
  { id: "surr", src: "/Images/style_buttons/surr.png", alt: "Surrealism" },
  { id: "trad", src: "/Images/style_buttons/trad.png", alt: "Traditional" },
  { id: "trashpolka", src: "/Images/style_buttons/trashpolka.png", alt: "Trash Polka" },
  { id: "tribal", src: "/Images/style_buttons/tribal.png", alt: "Tribal" },
  { id: "watercolor", src: "/Images/style_buttons/watercolor.png", alt: "Watercolor" },
  { id: "jap", src: "/Images/style_buttons/jap.png", alt: "Japanese" }
];


function Step1({ onNext, selectedStyles, onStyleChange, animate }) {
  const [limitReached, setLimitReached] = useState(false);

  const toggleStyle = (styleId) => {
    let updated;
    if (selectedStyles.includes(styleId)) {
      updated = selectedStyles.filter(id => id !== styleId);
    } else if (selectedStyles.length < 3) {
      updated = [...selectedStyles, styleId];
    } else {
      setLimitReached(true);
      setTimeout(() => setLimitReached(false), 300);
      updated = selectedStyles;
    }
    onStyleChange(updated);
  };

  return (
    <div className={`main-container1 ${animate ? 'fade-slide-out' : ''}`}>
        <div className="step-title-container">
          <p className="step-title-text">The Style</p>
          <p className='step-title-text step-title-subtext'>Choose up to 3</p>
        </div>
        <div className="scroll-wrapper px-3">
          <div className="row gx-3 justify-content-center style-button-container">
            {styles.map(style => (
              <div className="col-6 col-sm-4 col-md-3 mb-0" key={style.id}>
                <button
                  className={`style-button ${selectedStyles.includes(style.id) ? 'selected' : ''}${limitReached ? 'limit-reached' : ''}`}
                  id={style.id}
                  onClick={() => toggleStyle(style.id)}
                >
                  <img
                    src={style.src}
                    alt={style.alt}
                    className="img-fluid"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Step1;