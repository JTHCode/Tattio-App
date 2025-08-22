import React from 'react';
import Aurora from './components/Aurora';
import './App.css';
import MainContainer from './components/InputWizard/MainContainer';
function App() {
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

      {/* Logo Header */}
      <header className="logo-header">
        <div className="logo-container">
          <img src="/Images/Logo.png" alt="Tattio Logo" className="logo" />
        </div>
      </header>

      {/* Centered Main Content */}
      <div className="content">
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
