import React, { useState, useEffect } from 'react';
import Aurora from './components/Aurora';
import './App.css';
import MainContainer from './components/InputWizard/MainContainer';
import LandingPage from './components/LandingGate/LandingPage';

// import motion + AnimatePresence
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [showWizard, setShowWizard] = useState(false);

  // optional: auto-skip for returning visitors
  // useEffect(() => {
  //   if (localStorage.getItem('tattio_seen_intro') === '1') {
  //     setShowWizard(true);
  //   }
  // }, []);

  return (
    <div className="App">
      {/* Background Aurora */}
      <Aurora
        className="aurora-background"
        colorStops={["#612a91", "#5b42a8", "#5460e8"]}
        blend={0.8}
        amplitude={0.65}
        speed={0.9}
      />

      <AnimatePresence mode="cross-fade"> 
        {!showWizard && (
          <motion.section
            key="landing"
            initial={{ opacity: 0, y: 16, filter: 'blur(14px)', scale: 0.885 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ 
              opacity: 0, 
              y: -16, 
              filter: 'blur(11px)',
              transition: { duration: 0.2, ease: 'easeInOut' }
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <LandingPage
              onBegin={() => {
                localStorage.setItem('tattio_seen_intro', '1'); // optional
                setShowWizard(true);
              }}
            />
          </motion.section>
        )}

        {showWizard && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)', scale: 0.885 }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)', scale: 0.99 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Logo header only after wizard starts */}
            <header className="logo-header">
              <div className="logo-container">
                <img src="/Images/Logo.svg" alt="Tattio Logo" className="logo" />
              </div>
            </header>

            <div className="content">
              <MainContainer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;