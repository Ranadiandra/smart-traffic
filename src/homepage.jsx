import React, { useState, useRef, useEffect } from 'react';
import './homepage.css';
import logo1 from './assets/logo1.png';
import background from './assets/background.jpg';
import playIcon from './assets/button/play.png';
import closeIcon from './assets/button/close.png';
import introVideo from './assets/animasi_bg.mp4';
import klaksonSound from './assets/klakson.mp3';
import { useNavigate, useLocation } from 'react-router-dom';

function Homepage() {
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showPlay, setShowPlay] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const klaksonRef = useRef(null);

  useEffect(() => {
    setShowPlay(true);
    setShowVideo(false);
  }, [location.pathname]); // gunakan location jika ingin reset setiap ke homepage

  const handlePlayClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowVideo(true);
      setShowPlay(false);
      localStorage.removeItem('introPlayed');
      if (videoRef.current) videoRef.current.play();
      if (klaksonRef.current) {
        klaksonRef.current.currentTime = 0;
        klaksonRef.current.play();
      }
    }, 400); // waktu fade out harus sama dengan CSS
  };

  const handleVideoEnd = () => {
    navigate('/modegame'); // dari sebelumnya '/gamepage'
  };

  const handleClose = () => {
    // Coba tutup tab jika diizinkan browser
    window.close();
    // Jika gagal (tab tidak tertutup), redirect ke halaman lain
    setTimeout(() => {
      if (!window.closed) {
        window.location.href = "https://www.google.com"; // Ganti dengan URL tujuan jika perlu
      }
    }, 300);
  };

  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img
        src={logo1}
        alt="Smart Traffic Logo"
        className="game-logo"
      />
      <audio ref={klaksonRef} src={klaksonSound} />
      {showPlay && !showVideo && (
        <div className={`button-group${fadeOut ? ' fade-out' : ''}`}>
          <img
            src={playIcon}
            alt="Play"
            className="play-icon-btn"
            onClick={handlePlayClick}
            tabIndex={0}
            role="button"
            aria-label="Play"
          />
          <img
            src={closeIcon}
            alt="Close"
            className="close-img-btn"
            onClick={handleClose}
            tabIndex={0}
            role="button"
            aria-label="Close"
          />
        </div>
      )}
      {showVideo && (
        <div className="video-overlay">
          <video
            ref={videoRef}
            src={introVideo}
            className="intro-video"
            autoPlay
            onEnded={handleVideoEnd}
            onError={() => alert('Video gagal dimuat!')}
          />
        </div>
      )}
    </div>
  );
}

export default Homepage;