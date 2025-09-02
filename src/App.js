import React, { useState, useRef, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import NameEntry from './components/NameEntry';
import AgeCounter from './components/AgeCounter';
import GiftPages from './components/GiftPages';

// Make sure you have 6 DIFFERENT song files in your assets/music folder
import song1 from './assets/music/song1.mp3';
import song2 from './assets/music/song2.mp3';
import song3 from './assets/music/song3.mp3';
import song4 from './assets/music/song4.mp3';
import song5 from './assets/music/song5.mp3';
import song6 from './assets/music/song6.mp3';

const playlist = [song1, song2, song3, song4 ,song5, song6];

function App() {
  // Always start at step 1 on page load/reload
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');

  // Save step and name to localStorage for potential future use
  useEffect(() => {
    localStorage.setItem('appStep', step.toString());
  }, [step]);

  useEffect(() => {
    if (name) {
      localStorage.setItem('userName', name);
    }
  }, [name]);

  // --- MUSIC PLAYER LOGIC ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (step === 3 && audio) {
      if (!audio.src.includes(playlist[currentSongIndex])) {
        audio.src = playlist[currentSongIndex];
        audio.load();
      }
      audio.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed:", e));
    } else if (step < 3 && audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [step, currentSongIndex]);

  const playNextSong = () => {
    setCurrentSongIndex(prevIndex => (prevIndex + 1) % playlist.length);
  };
  
  const startPlaylistFromBeginning = () => {
    setCurrentSongIndex(0);
    if (audioRef.current) {
      audioRef.current.src = playlist[0];
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true));
    }
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
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeMusic = () => {
    if (step === 3 && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };
  // --- END OF MUSIC PLAYER LOGIC ---

  const handleNameSubmit = (enteredName) => {
    setName(enteredName);
    setStep(2);
  };
  
  const handleAgeComplete = () => setStep(3);
  
  const handleBack = () => { 
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      if (newStep === 1) {
        setName('');
        localStorage.removeItem('userName');
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <NameEntry onNameSubmit={handleNameSubmit} />;
      case 2:
        return <AgeCounter name={name} onComplete={handleAgeComplete} onBack={handleBack} />;
      case 3:
        return <GiftPages 
                 onBack={handleBack} 
                 pauseMusic={pauseMusic} 
                 resumeMusic={resumeMusic} 
                 onCakeFinish={startPlaylistFromBeginning}
               />;
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
      <Analytics/>
    </div>
  );
}

export default App;