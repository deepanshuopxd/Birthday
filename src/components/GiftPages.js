import React, { useState, useEffect } from 'react';
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
import vid1 from '../assets/videos/vid1.mp4';
import vid2 from '../assets/videos/vid2.mp4';
import vid3 from '../assets/videos/vid3.mp4';
import vid4 from '../assets/videos/vid4.mp4';

const galleryImages = [img2, img3, img4, img5, img6, img7, img8, img9, img10, img11,img15,img14];
const galleryVideos = [vid2, vid3, vid4];

const BalloonAnimation = () => ( <div className="balloon-layer">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="balloon" style={{ left: `${Math.random() * 90}%` }}></div>)}</div> );
const ConfettiAnimation = () => ( <div className="confetti-layer">{Array.from({ length: 30 }).map((_, i) => <div key={i} className="confetti" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 12}s` }}></div>)}</div> );

const GiftPages = ({ onBack, pauseMusic, resumeMusic }) => {
  const [page, setPage] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null); 
  const [activeImage, setActiveImage] = useState(null);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleBack = () => {
    if (page > 0) {
      setPage(page - 1);
    } else {
      onBack();
    }
  };

  // --- NEW VIDEO HANDLERS ---
  const handleVideoPlay = (videoSrc) => {
    pauseMusic();
    setActiveVideo(videoSrc);
  };

  const handleVideoClose = () => {
    resumeMusic();
    setActiveVideo(null);
  };
  // --- END OF NEW HANDLERS ---

  // Handle Yes button click
  const handleYesClick = () => {
    setPopupMessage("Ahh finally right decision. So,here is my number - 6396174031.");
    setShowPopup(true);
  };

  // Handle No button click
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
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  const renderCurrentPage = () => {
    const showAnimations = page > 0 && page < 7; 

    return (
      <>
        {showAnimations && <BalloonAnimation />}
        {showAnimations && <ConfettiAnimation />}

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
                      <button className="next-button" onClick={() => setPage(5)}>Next</button>
                    </div>
                  </div>
                );
            case 5:
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
  <strong className='h1'>The Day We First Met 🎥</strong><br />
  3rd of May , 2025 :- 
  Well chat roullete me milna dono ke liye hi kaafi unexpected tha and then same gaon se niklna or hi jyaada unexpected . 
  It could have been just another ordinary day for both of us but it didn't happen.
  And uske baad we had  a little convo and ofcourse insta got exchanged.
</p>

<p className='final'>
  <strong className='h1'>The First Conversations 💬</strong><br />
  From that day, we started talking on Instagram, sharing stories, laughter, and little bits of our lives. 
  Within days, we exchanged Snapchat and phone numbers, 
  and I began to realize how much I looked forward to our conversations. 
  Every message, every snap, became a small part of my everyday life.
</p>

<p className='final'>
  <strong className='h1'>Misunderstandings and Challenges ⚡</strong><br />
  Not everything was smooth. At one point, my friend said something completely nonsensical —
  that I was talking to you only because you reminded me of my ex.
  Well to be honest that was completely bullshit. 
  You never reminded me of my ex and that was not the reason that I started talking to you as Jaydeep told you.
  I want to apologize sincerely for that misunderstanding.
  I also want to apologize for any other moments where my words or actions may have confused or hurt you.
  That was never my intention, and I deeply regret it.
</p>

<p className='final'>
  <strong className='h1'>Shared Memories 🌸</strong><br />
  Despite all the misunderstanding in the beginning and then later proposal things, 
  we shared moments that became meaningful to me: like long calls about childhood and school, funny snaps, 
  and stories that made me smile every day. 
  Even when boundaries were tested or conversations slowed, those memories stayed with me.
</p>

<p className='final'>
  <strong className='h1'>Closure and Apologies ✉️</strong><br />
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
  <strong className='h1'>The Birthday Note & Website 🎂</strong><br />
  As I already said that Website is not created as a compensation.
  I made this website as a small tribute to our connection. 
  It's not meant to pressure you or ask for anything. 
  It's a way for me to celebrate the moments we shared,
  to honor the laughter and conversations that meant so much, 
  and to express my gratitude for having known you, even briefly.
</p>

<p className='final'>
  <strong className='h1'>A Door Always Open </strong><br />
  Well when we started talking nobody of us had thought that in the next 3-4 months our ways will be separated  
  and I respect your space and choices completely. 
  I sincerely apologize for disrespecting for your space for the the first and the last time.
  But if someday you feel like reconnecting as friends, 
  the door is always open. No expectations, no pressure — 
  just a space where we can share stories, laughter, 
  and the small moments that make life brighter.
</p>

<p className='final'>
  <strong className='h1'>Untill Then :-  </strong><br />
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
                          <button className="next-button" onClick={() => setPage(6)}>Next</button>
                        </div>
                    </div>
                );
            case 6:
              return (
                  <div className="centered-box animate-fade-in">
                      <h2>Once again, a very Happy Birthday❤️</h2>
                      
                      <div className="end-buttons">
                          <button onClick={() => setPage(7)}>Finish</button>
                          <button onClick={() => setPage(0)}>Want to see your present again?</button>
                         
                      </div>
                      <div className="mobile-nav-fixed">
                        <button className="back-button" onClick={handleBack}>Back</button>
                      </div>
                  </div>
              );
            case 7:
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
    </>
  );
};

export default GiftPages;