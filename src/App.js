import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NameEntry from './components/NameEntry';
import AgeCounter from './components/AgeCounter';
import GiftPages from './components/GiftPages';

// Import songs
import song1 from './assets/music/song1.mp3';
import song2 from './assets/music/song2.mp3';

const playlist = [song1, song2];

function App() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');

  // --- MUSIC PLAYER LOGIC ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // This single useEffect now handles all music logic reliably.
  useEffect(() => {
    const audio = audioRef.current;
    if (step === 3 && audio) {
      // If the audio source isn't the correct one, update it.
      if (!audio.src.includes(playlist[currentSongIndex])) {
        audio.src = playlist[currentSongIndex];
        audio.load();
      }
      // Play the audio.
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed:", e));
    } else if (step < 3 && audio) {
      // Pause the audio if we leave the gift pages.
      audio.pause();
      setIsPlaying(false);
    }
  }, [step, currentSongIndex]); // This logic runs only when the step or song changes.

  const playNextSong = () => {
    setCurrentSongIndex(prevIndex => (prevIndex + 1) % playlist.length);
  };

  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlaying(true));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const pauseMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeMusic = () => {
    // Only resume playing if we are on the gift pages.
    if (step === 3) {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };
  // --- END OF MUSIC PLAYER LOGIC ---

  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setStep(2);
  };
  
  const handleAgeComplete = () => setStep(3);
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <NameEntry onNameSubmit={handleNameSubmit} />;
      case 2:
        return <AgeCounter name={name} onComplete={handleAgeComplete} onBack={handleBack} />;
      case 3:
        // The onRestart prop is no longer needed. GiftPages handles its own loop.
        return <GiftPages onBack={handleBack} pauseMusic={pauseMusic} resumeMusic={resumeMusic} />;
      default:
        return <NameEntry onNameSubmit={handleNameSubmit} />;
    }
  };

  return (
    <div className="App">
       {step === 3 && (
        <div className="music-player">
          <audio ref={audioRef} onEnded={playNextSong} />
          <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={playNextSong}>Next Song</button>
        </div>
      )}
      
      <div className="container">
        {renderStep()}
      </div>
    </div>
  );
}

export default App;