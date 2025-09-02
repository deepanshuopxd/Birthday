import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import img6 from '../assets/images/img6.jpg';
import img7 from '../assets/images/img7.jpg';
import img8 from '../assets/images/img8.jpg';
import img9 from '../assets/images/img9.jpg';
import img10 from '../assets/images/img10.jpg';
import img11 from '../assets/images/img11.jpg';
import img12 from '../assets/images/img12.jpg';
import img13 from '../assets/images/img13.jpg';
import img15 from '../assets/images/img15.png';
import img14 from '../assets/images/img14.png';
import img16 from '../assets/images/img16.jpg';
import vid1 from '../assets/videos/vid1.mp4';
import vid2 from '../assets/videos/vid2.mp4';
import vid3 from '../assets/videos/vid3.mp4';
import vid4 from '../assets/videos/vid4.mp4';
import HBDMusic from '../assets/music/HBD.mp3';

const galleryImages = [img2, img3, img4, img5, img6, img7, img8, img9, img10, img11,img15,img14];
const galleryVideos = [vid2, vid3, vid4];

const envelopeContents = [
  { type: 'message', content: 'Your smile 😍 can light up the darkest day. Never stop being the amazing person you are ❤️!' },
  { type: 'message', content: 'Every conversation with you made my day brighter. Thank you for being such a wonderful friend 💖.' },
  { type: 'message', content: 'Your kindness and warmth are rare treasures in this world. Stay blessed always ❣️!' },
  { type: 'message', content: 'गुलाब जैं खिलल रह, सितारा जैं चमकदी रह। जन्मदिन की ढेर सारी बधाइ हो 💗.' },
  { type: 'message', content: 'You have this incredible ability to make others feel special. That\'s your superpower!' },
  { type: 'present', image: img16, text: 'A virtual bouquet of your favorite (maybe) flowers!' },
  { type: 'message', content: 'May your dreams take flight and your heart always stay young and hopeful ❤️.' },
  { type: 'message', content: 'सॉरी.. गलती मेरो हो, बस एक वार माफ करि दे। तुमार बिना मेरो दिन अधूरो लागछ।🥺' },
  { type: 'message', content: 'जन्मदिन को बहुत–बहुत बधाइ छ! भगवान तुमार जीवन खुशीयाँ स भरि दै।❤️' },
  { type: 'message', content: 'You deserve all the love and happiness this world has to offer ❤️‍🔥.' },
  { type: 'message', content: 'Thank you for all the memories we created together. They mean the world to me 💟.' },
  { type: 'message', content: 'तुमार जीवन फूल स बगिया जैं रंगीन रहै। जन्मदिन की बधाइ!❤️' },
  { type: 'message', content: 'Your strength and resilience inspire everyone around you. Keep shining 💕!' },
  { type: 'message', content: 'I hope your 20s are filled with adventures, love, and endless possibilities.' },
  { type: 'message', content: 'आज तुमार स्पेशल डे छ, खूब मस्ती कर आ धमाल कर! बर्थडे मुबारक हो।💕' },
  { type: 'message', content: 'May every step you take lead you closer to your dreams and happiness ❤️.' },
  { type: 'message', content: 'Happy 20th Birthday! May this milestone year be your most wonderful one yet 💟!' },
  { type: 'message', content: 'अगर मेरो कारन तुमार दुख भई गेल, त मैं दिल स माफी मँगूछु। तू मेरो सच्ची साथी छ, आ मैं तुमारो खोवाली नि चाहू।🥺' },
  { type: 'message', content: 'Here\'s to new beginnings, fresh starts, and the beautiful journey ahead 💖!' },
  { type: 'message', content: 'Not a message but more like a wish for me:- ✨ "Maybe the old friendship once we had can find its way back again — not bound by the past, but renewed with laughter, trust, and the comfort we once shared. If life ever gives us another chance, I hope we can cherish it with more understanding, kindness, and joy than before. Wishing for a friendship that feels even stronger, softer, and brighter than it ever was." ✨!' }
];

const BalloonAnimation = () => ( <div className="balloon-layer">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="balloon" style={{ left: `${Math.random() * 90}%` }}></div>)}</div> );
const ConfettiAnimation = () => ( <div className="confetti-layer">{Array.from({ length: 30 }).map((_, i) => <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 12}s` }}></div>)}</div> );
const FloatingHearts = () => ( <div className="hearts-layer">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="floating-heart" style={{ left: `${Math.random() * 95}%`, animationDelay: `${Math.random() * 10}s` }}>💖</div>)}</div> );
const SparkleAnimation = () => ( <div className="sparkle-layer">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="sparkle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>✨</div>)}</div> );

const GiftPages = ({ onBack, pauseMusic, resumeMusic, onCakeFinish }) => {
  const getSessionId = () => {
    let id = sessionStorage.getItem("sessionId");
    if (!id) {
      id = uuidv4();
      sessionStorage.setItem("sessionId", id);
    }
    return id;
  };
  const [sessionId] = useState(getSessionId);

  const [page, setPage] = useState(-1);
  const [activeVideo, setActiveVideo] = useState(null); 
  const [activeImage, setActiveImage] = useState(null);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showEnvelopes, setShowEnvelopes] = useState(false);
  const [openedEnvelopes, setOpenedEnvelopes] = useState([]);
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);
  
  // Cake page states
  const [candlesLit, setCandlesLit] = useState(false);
  const [showBlowMessage, setShowBlowMessage] = useState(false);
  const [blowAttempt, setBlowAttempt] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showHBDAnimation, setShowHBDAnimation] = useState(false);
  const [hbdMusic, setHbdMusic] = useState(null);

  // Puzzle game states
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [showPuzzlePopup, setShowPuzzlePopup] = useState(false);

  // Initialize HBD music
  useEffect(() => {
    const audio = new Audio(HBDMusic);
    audio.loop = false;
    setHbdMusic(audio);
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Pause main playlist music on the initial cake page
  useEffect(() => {
    if (page === -1) {
      pauseMusic();
    }
  }, [page, pauseMusic]);

  // Initialize puzzle pieces
  useEffect(() => {
    if (page === 4) {
      const pieces = Array.from({ length: 9 }, (_, i) => ({
        id: i,
        correctPosition: i,
        currentPosition: i
      }));
      for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i].currentPosition, pieces[j].currentPosition] = [pieces[j].currentPosition, pieces[i].currentPosition];
      }
      setPuzzlePieces(pieces);
    }
  }, [page]);

  const handleBack = () => {
    if (page > -1) {
      setPage(page - 1);
    } else {
      onBack();
    }
  };

  // Cake page handlers
  const handleLightCandles = () => {
    setCandlesLit(true);
    setTimeout(() => {
      setShowBlowMessage(true);
    }, 1000);
  };

  const handleBlowCandles = () => {
    if (blowAttempt === 0) {
      setShowBlowMessage(false);
      setTimeout(() => {
        setShowCountdown(true);
        startCountdown();
      }, 3000);
      setBlowAttempt(1);
    }
  };

  const startCountdown = () => {
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setShowCountdown(false);
        setCandlesBlown(true);
        setCandlesLit(false);
        setTimeout(() => {
          setShowHBDAnimation(true);
          if (hbdMusic) {
            hbdMusic.play();
          }
          setTimeout(() => {
            if (hbdMusic) {
              hbdMusic.pause();
              hbdMusic.currentTime = 0;
            }
            onCakeFinish(); 
            setPage(0);     
          }, 5000);
        }, 1000);
      }
    }, 1000);
  };

  // Puzzle game handlers
  const handlePuzzlePieceClick = (clickedPieceId) => {
    const emptyPieceIndex = puzzlePieces.findIndex(p => p.id === 8);
    const clickedPieceIndex = puzzlePieces.findIndex(p => p.id === clickedPieceId);
    if (emptyPieceIndex === -1 || clickedPieceIndex === -1) return;
    const emptyPiece = puzzlePieces[emptyPieceIndex];
    const clickedPiece = puzzlePieces[clickedPieceIndex];
    const emptyPosition = emptyPiece.currentPosition;
    const clickedPosition = clickedPiece.currentPosition;
    const emptyRow = Math.floor(emptyPosition / 3);
    const emptyCol = emptyPosition % 3;
    const clickedRow = Math.floor(clickedPosition / 3);
    const clickedCol = clickedPosition % 3;
    const isAdjacent =
      (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
      (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow);
    if (isAdjacent) {
      const newPieces = [...puzzlePieces];
      newPieces[emptyPieceIndex] = { ...emptyPiece, currentPosition: clickedPosition };
      newPieces[clickedPieceIndex] = { ...clickedPiece, currentPosition: emptyPosition };
      setPuzzlePieces(newPieces);
      const isSolved = newPieces.every(piece => piece.id === piece.currentPosition);
      if (isSolved) {
        setPuzzleSolved(true);
        setTimeout(() => setShowPuzzlePopup(true), 500);
      }
    }
  };

  // --- VIDEO & ENVELOPE HANDLERS (Unchanged) ---
  const handleVideoPlay = (videoSrc) => { pauseMusic(); setActiveVideo(videoSrc); };
  const handleVideoClose = () => { resumeMusic(); setActiveVideo(null); };
  const handleEnvelopeIconClick = () => setShowEnvelopes(true);
  const handleEnvelopeClick = (index) => { setSelectedEnvelope(envelopeContents[index]); setOpenedEnvelopes([...openedEnvelopes, index]); };
  const closeEnvelopePopup = () => setSelectedEnvelope(null);
  const resetEnvelopes = () => { setOpenedEnvelopes([]); setShowEnvelopes(true); };

  // --- EMAIL & DECISION LOGIC (Unchanged) ---
  const sendEmail = async (decision) => {
    let counters = JSON.parse(sessionStorage.getItem("decisionCounters") || '{"YES":0,"NO":0}');
    counters[decision]++;
    sessionStorage.setItem("decisionCounters", JSON.stringify(counters));
    let location = "Unknown";
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      location = `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (err) { console.error("Location fetch failed", err); }
    const params = { choice: decision, count: counters[decision], time: new Date().toLocaleString(), browser: navigator.userAgent, platform: navigator.platform, session: sessionId, location: location };
    emailjs.send("service_nwqoddr", "template_jt6jrpj", params, "KbvSTpfwcEqCCSA1r")
      .then(response => console.log("Email sent!", response.status, response.text), err => console.error("Email failed:", err));
  };
  const handleYesClick = () => { setPopupMessage("Ahh finally right decision. So,here is my number - 6396174031."); setShowPopup(true); sendEmail("YES"); };
  const handleNoClick = () => {
    const noMessages = ["Think again!", "Think one more time!", "Achee Se socho!", "Tum achee se soch hi nhi rhi ho!", "Ek baar or sochlo!", "Last Baar Sochlo!", "Now I am left with only one option!"];
    if (noClickCount < noMessages.length) {
      setPopupMessage(noMessages[noClickCount]);
      setShowPopup(true);
      setNoClickCount(noClickCount + 1);
      sendEmail("NO");
    }
  };
  const closePopup = () => setShowPopup(false);

  const renderCurrentPage = () => {
    const showAnimations = page > 0 && page < 9;
    const showHearts = page >= 1 && page <= 8;

    return (
      <>
        {showAnimations && <BalloonAnimation />}
        {showAnimations && <ConfettiAnimation />}
        {showHearts && <FloatingHearts />}

        {(() => {
          switch (page) {
            case -1:
              return (
                <div className="cake-page-container">
                  <div className="cake-page-title">
                    <h2>Happy 20th Birthday</h2>
                    <p>Make a wish and let the celebration begin!</p>
                  </div>
                  <div className="cake-container">
                    <div className="cake-and-stand">
                      <div className="cake">
                        <div className="cake-layer cake-bottom"></div>
                        <div className="cake-layer cake-top"></div>
                        <div className="cake-decoration">🎂</div>
                        <div className="candles">
                          {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="candle-container" style={{ left: `${33 + i * 30}%` }}>
                              <div className="candle"></div>
                              {candlesLit && <div className="flame"></div>}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="cake-stand"></div>
                    </div>
                    <div className="cake-buttons">
                      {!candlesLit && !showBlowMessage && !showCountdown && !candlesBlown && (
                        <button className="light-candles-btn" onClick={handleLightCandles}>🔥 Light the Candles</button>
                      )}
                      {showBlowMessage && (
                        <div className="blow-message">
                          <p>Make a wish and blow the candles!</p>
                          <button className="blow-btn" onClick={handleBlowCandles}>Blow 💨</button>
                        </div>
                      )}
                      {blowAttempt === 1 && !showCountdown && !candlesBlown && (
                        <div className="try-again-message">
                          <p>You didn't blow? Ok let's try again on the count of three!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {showCountdown && <div className="countdown"><h2>{countdown > 0 ? countdown : "Now Blow! 💨"}</h2></div>}
                  {showHBDAnimation && (
                    <div className="hbd-animation">
                      {/* <h1 className="hbd-text">🎉 Happy Birthday Vasundhara! 🎉</h1> */}
                      <div className="fireworks">
                        {/* {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="firework" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}>🎆</div>
                        ))} */}
                      </div>
                    </div>
                  )}
                  {candlesBlown && !showHBDAnimation && <div className="candles-blown"><p>🌟 Perfect! The wish is made! 🌟</p></div>}
                  <SparkleAnimation />
                  <FloatingHearts />
                 <div className="front">
                    <button className="back-button-1" onClick={handleBack}>Back</button>
                    <button className="next-button-2" onClick={() => setPage(0)}>Next</button>
                  </div>
                </div>
              );
            
            case 0:
              return (
                <div className="centered-box animate-fade-in">
                  <h2>Here is your birthday gift💕...</h2>
                  <button onClick={() => setPage(1)}>Click to see your present</button>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                  </div>
                </div>
              );

            case 1: 
              return (
                <div className="creative-box animate-fade-in">
                  <h2>Happy Birthday Vasundhara💖!</h2>
                  <img src={img1} alt="Happy Birthday" className="main-gift-image" />
                  <p className="birthday-note">
                    On this special day of yours, I just want to pause and celebrate you✨. Someone who truly deserves all the happiness, love, and light in the world 💖.  
                    Birthdays aren't just about getting older  they're about cherishing little moments 🌸, the people who touch our lives , and the memories that make us smile 😊. For me, you've been one of those bright moments ✨, and no matter where life takes us , I'll always be grateful that our paths crossed 💫.  
                    I hope this year brings you new adventures , gentle laughter 😄, and everything your heart quietly wishes for 💕. You deserve nothing less than the very best 🌹.  
                    So here's to you your kindness, your strength , your smile, and the journey ahead . May this year surprise you in all the most beautiful ways ✨.  
                    🎉 Happy Birthday once again! 🥳 Keep shining, always 🌟💖  
                  </p>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(2)}>Next</button>
                  </div>
                </div>
              );

            case 2:
              return (
                <div className="creative-box animate-fade-in">
                  <h2>The Day we met, obviously online 😅</h2>
                  <video src={vid1} controls onPlay={pauseMusic} onPause={resumeMusic} className="main-video"></video>
                  <p className="note">'I still remember that random day on Chatroulette .
                    A simple click, a chance moment, and suddenly there you were. 
                    At first, it felt like just another encounter, but looking back, that moment turned into something much more meaningful 💫.
                    Who would have thought that two people meeting by coincidence online could end up sharing so many conversations, laughs, and memories? 😄. 
                    And what made it even more unbelievable was finding out that we were from the same village , sharing the same background even while living in different cities.
                    Some moments in life feel small at the time, but later you realize they were special all along. 
                    For me, meeting you that day was exactly that ❤️ a little spark of fate in the middle of an ordinary day ✨.'</p>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(3)}>Next</button>
                  </div>
                </div>
              );

            case 3:
              return (
                <div className="game-intro-page animate-fade-in">
                  <h2>🎮 Game Time! 🎮</h2>
                  <div className="game-intro-content">
                    <div className="puzzle-preview">
                      <img src={img1} alt="Puzzle Preview" className="puzzle-preview-image" />
                    </div>
                    <p className="game-instruction">
                      Ready for a fun challenge? I've turned our special birthday image into a sliding puzzle! 
                      Rearrange the pieces to recreate the original image and unlock your next surprise! 🧩✨
                    </p>
                    <button className="start-game-btn" onClick={() => setPage(4)}>
                      🎯 Start the Puzzle!
                    </button>
                  </div>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(4)}>Next</button>
                  </div>
                </div>
              );

            case 4:
              return (
                <div className="puzzle-page animate-fade-in">
                  <h2>🧩 Solve the Puzzle to Get Your Present!</h2>
                  <p className="puzzle-instruction">Click on pieces next to the empty space to move them!</p>
                  <div className="puzzle-container">
                    <div className="puzzle-grid">
                      {Array.from({ length: 9 }).map((_, position) => {
                        const piece = puzzlePieces.find(p => p.currentPosition === position);
                        return (
                          <div key={position} className="puzzle-cell">
                            {piece && piece.id !== 8 ? (
                              <div 
                                className="puzzle-piece"
                                style={{
                                  backgroundImage: `url(${img1})`,
                                  backgroundPosition: `${-(piece.id % 3) * 100}px ${-Math.floor(piece.id / 3) * 100}px`,
                                  backgroundSize: '300px 300px'
                                }}
                                onClick={() => handlePuzzlePieceClick(piece.id)}
                              />
                            ) : null}
                          </div>
                        );
                        
                      })}
                    </div>
                  </div>
                    <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(5)}>Next</button>
                  </div>
                  {puzzleSolved && (
                    <div className="puzzle-solved">
                      <h3>🎉 Puzzle Solved! 🎉</h3>
                      <button className="reveal-present-btn" onClick={() => setShowPuzzlePopup(true)}>
                        🎁 Click to see your present!
                      </button>
                    </div>
                  )}
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    
                    <button className="next-button" onClick={() => setPage(5)}>Next</button>
                    
                  </div>
                </div>
              );

            case 5:
              return (
                <div className="gallery-page animate-fade-in">
                  <div className="gallery-background">
                    {galleryImages.map((img, index) => {
                      const animationClass = index % 2 === 0 ? 'right' : 'left';
                      return (
                        <img 
                          key={index} src={img} alt="animating memory" 
                          className={`drifting-image ${animationClass}`}
                          style={{ top: `${20 + (index * 4.5)}%`, animationDelay: `-${index * 3}s` }}
                          onClick={() => setActiveImage(img)}
                        />
                      );
                    })}
                  </div>
                  <h2>A Collection of Moments</h2>
                  <p className='moments-h'>Click on an image or video to see it up close! Well I have only limited resources so😅</p>
                  <div className="video-thumbnails">
                    {galleryVideos.map((vid, index) => (
                      <video key={index} src={vid} className="thumbnail" onClick={() => handleVideoPlay(vid)} />
                    ))}
                  </div>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(6)}>Next</button>
                  </div>
                </div>
              );

            case 6:
              return (
                <div className="game-page animate-fade-in">
                  <h2>Some messages or maybe some presents for you</h2>
                  <p className="game-instruction">There are 20 envelopes as you're entering into your 20s. Click on the picture to see what you got.</p>
                  {!showEnvelopes && openedEnvelopes.length === 0 && (
                    <div className="envelope-starter">
                      <div className="magic-box" onClick={handleEnvelopeIconClick}>🎁</div>
                      <p>Click the gift box to reveal your envelopes!</p>
                    </div>
                  )}
                  {openedEnvelopes.length === 20 && (
                    <div className="all-opened">
                      <p className="completion-message">🎉 You've opened all your birthday surprises! 🎉</p>
                      <div className="treasure-box" onClick={resetEnvelopes}>📦</div>
                      <p>Click on this icon to see your messages and presents again</p>
                    </div>
                  )}
                  {showEnvelopes && openedEnvelopes.length < 20 && (
                    <div className="envelopes-container">
                      {envelopeContents.map((_, index) => {
                        if (openedEnvelopes.includes(index)) return null;
                        return (
                          <div 
                            key={index} 
                            className="envelope" 
                            onClick={() => handleEnvelopeClick(index)}
                            style={{
                              animationDelay: `${index * 0.1}s`,
                              left: `${(index % 5) * 18 + 10}%`,
                              top: `${Math.floor(index / 5) * 25 + 20}%`
                            }}
                          >✉️</div>
                        );
                      })}
                    </div>
                  )}
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(7)}>Next</button>
                  </div>
                </div>
              );

            case 7:
              return (
                <div className="creative-box animate-fade-in">
                  <h2>Our Picture "Together(Snap Bitmoji will Count too)"</h2>
                  <div className="together-pics-container">
                    <img src={img12} alt="together pic 1" className="static-pic" />
                    <img src={img13} alt="together pic 2" className="static-pic" />
                  </div>
                  <p className="note">'Although we haven't met in real life yet, 
                    I imagine it would feel just as natural and effortless as our conversations online 💬✨ 
                    I picture the same laughs 😄 the same comfort 🌸 
                    and the same easy connection that always made our talks feel special 💫
                    Well that ghibli is generated by GPT giving our image as prompt!!!'</p>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(8)}>Next</button>
                  </div>
                </div>
              );

            case 8:
              return (
                <div className="creative-box animate-fade-in">
                  <h2>If you have reached till here...</h2>
                  <p className="final-note">
                    ✨ <strong>Just take a look at this and think about it...
                    Before Starting anything I want to say that:-
                    You are really beautiful, kind, talented,etc.
                    To be honest words fell short to describe you.
                    and this is I am saying as a human being not as your friend or something else.
                    </strong> ✨
                  </p>
                  <p className='final'>
                    <strong className='head'>The Day We First Met 🎥</strong><br />
                    3rd of May , 2025 :- 
                    Well meeting on chat roullete was unexpected and what's more unexpected was sharing the same background and village . 
                    It could have been just another ordinary day for both of us but it didn't happen.
                    And then we had some convo and then exchanged our Instagram handle.
                  </p>
                  <p className='final'>
                    <strong className='head'>The First Conversations 💬</strong><br />
                    From that day, we started talking on Instagram, sharing stories, laughter, and little bits of our lives. 
                    Within days, we exchanged Snapchat and phone numbers, 
                    and I began to realize how much I looked forward to our conversations. 
                    Every message, every snap, became a small part of my everyday life.
                  </p>
                  <p className='final'>
                    <strong className='head'>Misunderstandings and Challenges ⚡</strong><br />
                    Not everything was smooth. At one point, my friend said something completely nonsensical —
                    that I was talking to you only because you reminded me of my ex.
                    Well to be honest that was completely bullshit. 
                    You never reminded me of my ex and that was not the reason that I started talking to you as Jaydeep told you.
                    I want to apologize sincerely for that misunderstanding.
                    I also want to apologize for any other moments where my words or actions may have confused or hurt you.
                    That was never my intention, and I deeply regret it.
                  </p>
                  <p className='final'>
                    <strong className='head'>Shared Memories 🌸</strong><br />
                    Despite all the misunderstanding in the beginning and then later proposal things, 
                    we shared moments that became meaningful to me: like long calls about childhood and school, funny snaps, 
                    and stories that made me smile every day. 
                    Even when boundaries were tested or conversations slowed, those memories stayed with me.
                  </p>
                  <p className='final'>
                    <strong className='head'>Closure and Apologies ✉️</strong><br />
                    After a period of silence and confusion, 
                    I once wrote a closure message to express my feelings honestly
                    acknowledging that I still liked you and that I respected whatever decision you had made.
                    Even after saying goodbye, I found myself hoping we could stay friends, 
                    and I realize now that it may have felt like pressure from my side. 
                    I want to sincerely apologize for that. 
                    At that time I didn't notice that I was pressurizing you.
                    My intention was never to upset or irritate you, 
                    but only to be honest about my feelings and to ask forgiveness for any mistakes I made along the way. 
                    I hope that, with time, you can understand that it came from a place of care and not expectation.
                    And this website is not created as compensation of it but because I aready decided it back when we used to talk.
                    Website - not created because I had feelings for you but for the friendship bond that was growing.
                  </p>
                  <p className='final'>
                    <strong className='head'>The Birthday Note & Website 🎂</strong><br />
                    As I already said that Website is not created as a compensation.
                    I made this website as a small tribute to our connection. 
                    It's not meant to pressure you or ask for anything. 
                    It's a way for me to celebrate the moments we shared,
                    to honor the laughter and conversations that meant so much, 
                    and to express my gratitude for having known you, even briefly.
                  </p>
                  <p className='final'>
                    <strong className='head'>A Door Always Open </strong><br />
                    Well when we started talking nobody of us had thought that in the next 3-4 months our ways will be separated  
                    and I respect your space and choices completely. 
                    I sincerely apologize for disrespecting for your space for the the first and the last time.
                    But if someday you feel like reconnecting as friends, 
                    the door is always open. No expectations, no pressure — 
                    just a space where we can share stories, laughter, 
                    and the small moments that make life brighter.
                  </p>
                  <p className='final'>
                    <strong className='head'>Untill Then :-  </strong><br />
                    Until then, I wish you happiness, peace, and everything your heart quietly hopes for.
                     Even if we never talk again, I will always carry the memories we created, the lessons I learned, 
                     and the connection that once made my days better.
                  </p>
                  <p className='final'>
                    Thank you for being part of my life, even if only for a while ❤️
                  </p>
                  <p className='final'>
                    💌 <em>"Whenever you feel like sharing a laugh, a story, or just a small moment, know that the door is always open — no expectations, just friendship."</em>
                  </p>
                  <p className='final-final'>
                  "Once again a very Happy Birthday <strong>Dost ❤️."</strong>
                  </p>
                  <p className='final-final'>
                    <strong>So , a new start to this friendship? </strong><br></br>
                    <strong></strong>
                    <strong>Choose Wisely:- </strong>
                  </p>
                  <div className="decision-section">
                    <div className="decision-buttons">
                      <button className="yes-button" onClick={handleYesClick}>Yes</button>
                      {noClickCount < 7 && (
                        <button className="no-button" onClick={handleNoClick}>No</button>
                      )}
                    </div>
                  </div>
                  <p className='f1'>
                    ~Deepanshu
                    (A online friend or a stranger?)
                  </p>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={() => setPage(9)}>Next</button>
                  </div>
                </div>
              );

            case 9:
              return (
                <div className="centered-box animate-fade-in">
                  <h2>Once again, a very Happy Birthday❤️</h2>
                  <div className="end-buttons">
                    <button onClick={() => setPage(10)}>Finish</button>
                    <button onClick={() => setPage(0)}>Want to see your present again?</button>
                  </div>
                  <div className="mobile-nav-fixed">
                    <button className="back-button" onClick={handleBack}>Back</button>
                  </div>
                </div>
              );

            case 10:
              return (
                <div className="centered-box animate-fade-in">
                  <h2>Once Again Happy Birthday❤️</h2>
                  <h3 className='ff'>~Deepanshu</h3>
                </div>
              );
              
            default: return null;
          }
        })()}
      </>
    );
  };

  return (
    <>
      {renderCurrentPage()}
      {activeVideo && (
        <div className="media-player-overlay" onClick={handleVideoClose}>
          <div className="media-player-box" onClick={(e) => e.stopPropagation()}>
            <video src={activeVideo} controls autoPlay onEnded={handleVideoClose}></video>
          </div>
        </div>
      )}
      {activeImage && (
        <div className="media-player-overlay" onClick={() => setActiveImage(null)}>
          <div className="media-player-box" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt="enlarged memory" />
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>{popupMessage}</p>
            <button className="popup-close" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
      {selectedEnvelope && (
        <div className="envelope-popup-overlay" onClick={closeEnvelopePopup}>
          <div className="envelope-popup-content" onClick={(e) => e.stopPropagation()}>
            {selectedEnvelope.type === 'present' ? (
              <>
                <img src={selectedEnvelope.image} alt="Present" className="present-image" />
                <p>{selectedEnvelope.text}</p>
              </>
            ) : (
              <p>{selectedEnvelope.content}</p>
            )}
            <button className="envelope-close" onClick={closeEnvelopePopup}>Close</button>
          </div>
        </div>
      )}
      {showPuzzlePopup && (
        <div className="popup-overlay" onClick={() => setShowPuzzlePopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>🎉 Puzzle Solved! 🎉</h3>
            <p>Well I am giving my blessings to you as a reward for solving this riddle😌</p>
            <button className="popup-close" onClick={() => {
              setShowPuzzlePopup(false);
              setPage(5);
            }}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftPages;