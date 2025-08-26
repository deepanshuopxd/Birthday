import React, { useState } from 'react';

const AgeCounter = ({ name, onComplete, onBack }) => {
  const [age, setAge] = useState(0);

  const handleIncrease = () => {
    if (age < 19) {
      setAge(age + 1);
    }
  };

  if (age === 19) {
    return (
      <div className="centered-box birthday-popup">
        <h2>🎉 Happy Birthday, {name}! 🎉</h2>
        <p>You have completed 19 years and are now stepping into your 20s. May this year bring you endless joy and success!</p>
        <button onClick={onComplete}>Next</button>
      </div>
    );
  }

  return (
    <div className="centered-box">
      <h2>Hi, {name}!</h2>
      <p className="age-display">{age}</p>
      <button onClick={handleIncrease} disabled={age >= 19}>
        Increase Age
      </button>
      <div className="mobile-nav-buttons">
         <button className="back-button" onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default AgeCounter;