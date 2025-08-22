import React, { useState } from 'react';
import './InputWizard.css'
import '../../App.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

// Import styles array
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

function MainContainer() {
  const [step, setStep] = useState(1);
  const [entryAnimation, setEntryAnimation] = useState(false);
  const [animateStep, setAnimateStep] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [styleWeights, setStyleWeights] = useState({});
  const [promptInput, setPromptInput] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [sliderValues, setSliderValues] = useState({
    complexity: false,
    contrast: false,
    shading: false,
    lineThickness: false,
    colorComplexity: false,
    colorRange: false
  });
  const [isColorEnabled, setIsColorEnabled] = useState(false);

  const validateStep2 = () => {
    if (step === 2) {
      if (!promptInput || promptInput.trim() === '') {
        alert('Please describe your tattoo');
        return false;
      }
      if (!selectedBodyPart) {
        alert('Please select a body part for your tattoo');
        return false;
      }
      if (!selectedSize) {
        alert('Please select a size for your tattoo');
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (validateStep2()) {
      setAnimateStep(true); // trigger animation
      setTimeout(() => {
        setStep(prev => prev + 1);
        setAnimateStep(false);
        setEntryAnimation(true); // animate the new step in

        setTimeout(() => {
          setEntryAnimation(false); // reset so future steps can re-animate
        }, 400); // match fadeSlideIn duration
      }, 400); // match fadeSlideOut duration
    }
  };
  const prev = () => setStep((prev) => prev - 1);

  // Handlers for all state updates
  const handleStyleChange = (styles) => setSelectedStyles(styles);
  const handleWeightChange = (weights) => setStyleWeights(weights);
  const handlePromptChange = (prompt) => setPromptInput(prompt);
  const handleSizeChange = (size) => setSelectedSize(size);
  const handleBodyPartChange = (part) => setSelectedBodyPart(part);
  const handleSliderChange = (values) => setSliderValues(values);
  const handleColorToggle = (isEnabled) => setIsColorEnabled(isEnabled);

  // Prepare data for backend
  const getTattooData = () => {
    return {
      styles: selectedStyles.map(style => {
        if (typeof style === 'object') {
          return {
            ...style,
            weight: styleWeights[style.id] || 50
          };
        }
        const styleObj = styles.find(s => s.id === style);
        return {
          ...styleObj,
          weight: styleWeights[style] || 50
        };
      }),
      prompt: promptInput,
      size: selectedSize,
      bodyPart: selectedBodyPart,
      parameters: {
        complexity: sliderValues.complexity,
        contrast: sliderValues.contrast,
        shading: sliderValues.shading,
        lineThickness: sliderValues.lineThickness,
        colorComplexity: sliderValues.colorComplexity,
        colorRange: sliderValues.colorRange
      },
      isColorEnabled: isColorEnabled
    };
  };

  return (
    <div className="main-container-wrapper">
      <div className="step-container">
        {step === 1 && (
          <Step1
            onNext={next}
            animate={animateStep}
            selectedStyles={selectedStyles}
            onStyleChange={handleStyleChange}
          />
        )}
        {step === 2 && (
          <Step2
            onNext={next}
            onBack={prev}
            entryAnimation={entryAnimation}
            animate={animateStep}
            selectedStyles={selectedStyles}
            onWeightChange={handleWeightChange}
            onPromptChange={handlePromptChange}
            onSizeChange={handleSizeChange}
            onBodyPartChange={handleBodyPartChange}
            onSliderChange={handleSliderChange}
            onColorToggle={handleColorToggle}
            promptInput={promptInput}
            selectedSize={selectedSize}
            selectedBodyPart={selectedBodyPart}
            sliderValues={sliderValues}
            isColorEnabled={isColorEnabled}
          />
        )}
        {step === 3 && (
          <Step3
            onBack={prev}
            entryAnimation={entryAnimation}
            animate={animateStep}
            getTattooData={getTattooData}
          />
        )}
        <div className="button-container" style={{
          display: step === 3 ? 'none' : 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {(step === 2 || step === 3) && (
            <button
              className="cta"
              onClick={prev}
            >
              <span className="second left-arrow">
                <svg
                  width="100px"
                  height="20px"
                  viewBox="0 0 66 43"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'rotate(180deg)' }}
                >
                  <g
                    id="arrow"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <path
                      className="one"
                      d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                      fill="var(--secondary-color)"
                    ></path>
                    <path
                      className="two"
                      d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                      fill="var(--secondary-color)"
                    ></path>
                    <path
                      className="three"
                      d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                      fill="var(--secondary-color)"
                    ></path>
                  </g>
                </svg>
              </span>
              <span className="span, back-txt">BACK</span>
            </button>
          )}
          <button
            className="cta"
            onClick={next}
            disabled={
              (step === 1 && selectedStyles.length === 0) ||
              (step === 2 && (!promptInput?.trim() || !selectedBodyPart || !selectedSize))
            }
            style={{
              pointerEvents: (
                (step === 1 && selectedStyles.length === 0) ||
                (step === 2 && (!promptInput?.trim() || !selectedBodyPart || !selectedSize))
              ) ? 'none' : 'auto'
            }}
          >
            <span className="span">NEXT</span>
            <span className="second">
              <svg
                width="3rem"
                height="20px"
                viewBox="0 0 66 43"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="arrow"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <path
                    className="one"
                    d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                    fill="var(--secondary-color)"
                  ></path>
                  <path
                    className="two"
                    d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                    fill="var(--secondary-color)"
                  ></path>
                  <path
                    className="three"
                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                    fill="var(--secondary-color)"
                  ></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;