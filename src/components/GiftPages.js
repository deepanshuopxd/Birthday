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
import img17 from '../assets/images/img17.jpg';
import img18 from '../assets/images/img18.jpg';
import img19 from '../assets/images/img19.jpg';
import img20 from '../assets/images/img20.jpg';
import vid1 from '../assets/videos/vid1.mp4';
import vid2 from '../assets/videos/vid2.mp4';
import vid3 from '../assets/videos/vid3.mp4';
import vid4 from '../assets/videos/vid4.mp4';

const galleryImages = [img2, img3, img4, img5, img6, img7, img8, img9, img10, img11,img15,img14];
const galleryVideos = [vid2, vid3, vid4];

const envelopeContents = [
  { type: 'message', content: 'Your smile 😍 can light up the darkest day. Never stop being the amazing person you are ❤️!' },
  { type: 'message', content: 'Every conversation with you made my day brighter. Thank you for being such a wonderful friend 💖.' },
  { type: 'message', content: 'Your kindness and warmth are rare treasures in this world. Stay blessed always ❣️!' },
  { type: 'message', content: 'I hope this new year of your life brings you endless joy and beautiful surprises 💗.' },
  { type: 'message', content: 'You have this incredible ability to make others feel special. That\'s your superpower!' },
  { type: 'present', image: img16, text: 'A virtual bouquet of your favorite (maybe) flowers!' },
  { type: 'message', content: 'May your dreams take flight and your heart always stay young and hopeful ❤️.' },
  { type: 'message', content: 'Your laughter is music to the soul. Keep spreading that beautiful energy 🤍!' },
  { type: 'present', image: img17, text: 'Well this is just a virtual gift! But I\'ll give them as a present next time if we\'ll reconnect again😅!' },
  { type: 'message', content: 'You deserve all the love and happiness this world has to offer ❤️‍🔥.' },
  { type: 'message', content: 'Thank you for all the memories we created together. They mean the world to me 💟.' },
  { type: 'present', image: img18, text: 'A peacock pendant for you! Although peacocks are very beautiful and mesmerizing but somehow your beauty and elegance resembles like a peacock🦚! ' },
  { type: 'message', content: 'Your strength and resilience inspire everyone around you. Keep shining 💕!' },
  { type: 'message', content: 'I hope your 20s are filled with adventures, love, and endless possibilities.' },
  { type: 'present', image: img19, text: 'I\'ll buy one for you. Not the girl but the kurti obviously😂 only if you\'ll explore the markets with me someday!' },
  { type: 'message', content: 'May every step you take lead you closer to your dreams and happiness ❤️.' },
  { type: 'message', content: 'Happy 20th Birthday! May this milestone year be your most wonderful one yet 💟!' },
  { type: 'present', image: img20, text: 'This is not a gift for you but a treat for me which will be given by you🥳 if you\'ll wander with me in the streets of Banaras and make me try some best Banarasi Street Food! ' },
  { type: 'message', content: 'Here\'s to new beginnings, fresh starts, and the beautiful journey ahead 💖!' },
  { type: 'message', content: 'Not a message but more like a wish for me:- ✨ “Maybe the old friendship once we had can find its way back again — not bound by the past, but renewed with laughter, trust, and the comfort we once shared. If life ever gives us another chance, I hope we can cherish it with more understanding, kindness, and joy than before. Wishing for a friendship that feels even stronger, softer, and brighter than it ever was.” ✨!' }
];

const BalloonAnimation = () => ( <div className="balloon-layer">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="balloon" style={{ left: `${Math.random() * 90}%` }}></div>)}</div> );
const ConfettiAnimation = () => ( <div className="confetti-layer">{Array.from({ length: 30 }).map((_, i) => <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 12}s` }}></div>)}</div> );
const FloatingHearts = () => ( <div className="hearts-layer">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="floating-heart" style={{ left: `${Math.random() * 95}%`, animationDelay: `${Math.random() * 10}s` }}>💖</div>)}</div> );

const GiftPages = ({ onBack, pauseMusic, resumeMusic }) => {
  const getSessionId = () => {
    let id = localStorage.getItem("sessionId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("sessionId", id);
    }
    return id;
  };
  const [sessionId] = useState(getSessionId);

const [page, setPage] = useState(() => {
  const savedPage = localStorage.getItem('currentPage');
  if (savedPage) {
    const parsed = parseInt(savedPage, 10);
    return parsed === 8 ? 0 : parsed; // Reset to start if last page
  }
  return 0;
});
  const [activeVideo, setActiveVideo] = useState(null); 
  const [activeImage, setActiveImage] = useState(null);
  const [noClickCount, setNoClickCount] = useState(() => {
    const savedCount = localStorage.getItem('noClickCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showEnvelopes, setShowEnvelopes] = useState(() => {
    const savedEnvelopes = localStorage.getItem('showEnvelopes');
    return savedEnvelopes ? JSON.parse(savedEnvelopes) : false;
  });
  const [openedEnvelopes, setOpenedEnvelopes] = useState(() => {
    const savedOpened = localStorage.getItem('openedEnvelopes');
    return savedOpened ? JSON.parse(savedOpened) : [];
  });
  const [selectedEnvelope, setSelectedEnvelope] = useState(null);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Save page state to localStorage
  useEffect(() => {
    localStorage.setItem('currentPage', page.toString());
  }, [page]);

  // Save envelope game state to localStorage
  useEffect(() => {
    localStorage.setItem('noClickCount', noClickCount.toString());
  }, [noClickCount]);

  useEffect(() => {
    localStorage.setItem('showEnvelopes', JSON.stringify(showEnvelopes));
  }, [showEnvelopes]);

  useEffect(() => {
    localStorage.setItem('openedEnvelopes', JSON.stringify(openedEnvelopes));
  }, [openedEnvelopes]);

  const handleBack = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      onBack();
    }
  };

  // --- VIDEO HANDLERS ---
  const handleVideoPlay = (videoSrc) => {
    pauseMusic();
    setActiveVideo(videoSrc);
  };

  const handleVideoClose = () => {
    resumeMusic();
    setActiveVideo(null);
  };

  // --- ENVELOPE HANDLERS ---
  const handleEnvelopeIconClick = () => {
    setShowEnvelopes(true);
  };

  const handleEnvelopeClick = (index) => {
    setSelectedEnvelope(envelopeContents[index]);
    setOpenedEnvelopes([...openedEnvelopes, index]);
  };

  const closeEnvelopePopup = () => {
    setSelectedEnvelope(null);
  };

  const resetEnvelopes = () => {
    setOpenedEnvelopes([]);
    setShowEnvelopes(true);
  };

  const sendEmail = async (decision) => {
    let counters = JSON.parse(localStorage.getItem("decisionCounters") || '{"YES":0,"NO":0}');
    counters[decision] = (counters[decision] || 0) + 1;
    localStorage.setItem("decisionCounters", JSON.stringify(counters));

    let location = "Unknown";
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      location = `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (err) { console.error("Location fetch failed", err); }

    const params = {
      choice: decision,
      count: counters[decision],
      time: new Date().toLocaleString(),
      browser: navigator.userAgent,
      platform: navigator.platform,
      session: sessionId,
      location: location
    };

    emailjs.send(
      "service_nwqoddr",
      "template_jt6jrpj",
      params,
      "KbvSTpfwcEqCCSA1r"
    ).then(
      response => console.log("Email sent!", response.status, response.text),
      err => console.error("Email failed:", err)
    );
  };

  const handleYesClick = () => {
    setPopupMessage("Ahh finally right decision. So,here is my number - 6396174031.");
    setShowPopup(true);
    sendEmail("YES");
  };

  const handleNoClick = () => {
    const noMessages = [
      "Think again!",
      "Think one more time!", 
      "Achee Se socho!",
      "Tum achee se soch hi nhi rhi ho!",
      "Ek baar or sochlo!",
      "Last Baar Sochlo!",
      "Now I am left with only one option!"
    ];
    
    if (noClickCount < noMessages.length) {
      setPopupMessage(noMessages[noClickCount]);
      setShowPopup(true);
      setNoClickCount(noClickCount + 1);
      sendEmail("NO");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderCurrentPage = () => {
    const showAnimations = page > 0 && page < 8; 
    const showHearts = page >= 1 && page <= 7;

    return (
      <>
        {showAnimations && <BalloonAnimation />}
        {showAnimations && <ConfettiAnimation />}
        {showHearts && <FloatingHearts />}

        {(() => {
          switch (page) {
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
                        <p className='moments-h'>Click on an image or video to see it up close!
                          Well I have only limited resources so😅
                        </p>
                        
                        <div className="video-thumbnails">
                            {galleryVideos.map((vid, index) => (
                              <video key={index} src={vid} className="thumbnail" onClick={() => handleVideoPlay(vid)} />
                            ))}
                        </div>
                        <div className="mobile-nav-fixed">
                          <button className="back-button" onClick={handleBack}>Back</button>
                          <button className="next-button" onClick={() => setPage(4)}>Next</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="game-page animate-fade-in">
                        <h2>Some messages or maybe some presents for you</h2>
                        <p className="game-instruction">There are 20 envelopes as you're entering into your 20s. Click on the picture to see what you got.</p>
                        
                        {!showEnvelopes && openedEnvelopes.length === 0 && (
                            <div className="envelope-starter">
                                <div className="magic-box" onClick={handleEnvelopeIconClick}>
                                    🎁
                                </div>
                                <p>Click the gift box to reveal your envelopes!</p>
                            </div>
                        )}

                        {openedEnvelopes.length === 20 && (
                            <div className="all-opened">
                                <p className="completion-message">🎉 You've opened all your birthday surprises! 🎉</p>
                                <div className="treasure-box" onClick={resetEnvelopes}>
                                    📦
                                </div>
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
                                        >
                                            ✉️
                                        </div>
                                    );
                                })}
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
                      <button className="next-button" onClick={() => setPage(6)}>Next</button>
                    </div>
                  </div>
                );
            case 6:
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
  Well chat roullete me milna dono ke liye hi kaafi unexpected tha and then same gaon se niklna or hi jyaada unexpected . 
  It could have been just another ordinary day for both of us but it didn't happen.
  And uske baad we had  a little convo and ofcourse insta got exchanged.
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
<p className='final'>
"Once again a very Happy Birthday to you ❤️."
</p>
<p className='final-final'>
  <strong>So , a new start to this friendship?</strong>
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
                          <button className="next-button" onClick={() => setPage(7)}>Next</button>
                        </div>
                    </div>
                );
            case 7:
              return (
                  <div className="centered-box animate-fade-in">
                      <h2>Once again, a very Happy Birthday❤️</h2>
                      
                      <div className="end-buttons">
                          <button onClick={() => setPage(8)}>Finish</button>
                          <button onClick={() => setPage(0)}>Want to see your present again?</button>
                         
                      </div>
                      <div className="mobile-nav-fixed">
                        <button className="back-button" onClick={handleBack}>Back</button>
                      </div>
                  </div>
              );
            case 8:
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
    </>
  );
};

export default GiftPages;