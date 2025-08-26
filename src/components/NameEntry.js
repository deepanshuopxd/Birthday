// import React, { useState } from 'react';

// const NameEntry = ({ onNameSubmit }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [error, setError] = useState('');

//   const handleNext = () => {
//     if (inputValue.trim().toLowerCase() === 'vasundhara') {
//       onNameSubmit(inputValue.trim());
//       setError('');
//     } else {
//       setError('Wrong name, please try again. ❤️');
//     }
//   };

//   return (
//     <div className="centered-box">
//       <h2>Hi, enter your name to continue</h2>
//       <input
//         type="text"
//         placeholder="Enter name here"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <p className="caution-note">Please enter the correct first name only.</p>
//       {error && <p className="error-note">{error}</p>}
//       <button onClick={handleNext}>Next</button>
//     </div>
//   );
// };

// export default NameEntry;



import React, { useState } from 'react';

const NameEntry = ({ onNameSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (inputValue.trim().toLowerCase() === 'vasundhara') {
      onNameSubmit(inputValue.trim());
      setError('');
    } else {
      setError('Wrong name, please try again. ❤️');
    }
  };

  // This is our fourth and final checkpoint
  console.log("4. NameEntry component is rendering");

  return (
    <div className="centered-box">
      <h2>Hi, enter your name to continue</h2>
      <input
        type="text"
        placeholder="Enter name here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="caution-note">Please enter the correct first name only.</p>
      {error && <p className="error-note">{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default NameEntry;