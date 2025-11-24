import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './modepage.css';
import backgroundGame from './assets/bg.png';
import logoGameMode from './assets/logo_game_mode.png';
import gametimeImg from './assets/mode/gametime.png';
import studyImg from './assets/mode/study.png';
import clickSound from './assets/sounds/click-sound.mp3';

function Gamepage() {
  const navigate = useNavigate();
  const clickAudioRef = useRef(null);

  const handleClick = (target) => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }
    if (target === 'study') {
      setTimeout(() => navigate('/studypage'), 150);
    } else if (target === 'gametime') {
      setTimeout(() => navigate('/gamepage'), 150);
    }
  };

  return (
    <div
      className="gamepage-bg"
      style={{ backgroundImage: `url(${backgroundGame})` }}
    >
      <audio ref={clickAudioRef} src={clickSound} />
      <img
        src={logoGameMode}
        alt="Game Mode Logo"
        className="gamepage-logo"
      />
      <div className="gamepage-options">
        <img
          src={studyImg}
          alt="Study"
          className="option-img study-img"
          onClick={() => handleClick('study')}
        />
        <img
          src={gametimeImg}
          alt="Gametime"
          className="option-img gametime-img"
          onClick={() => handleClick('gametime')}
        />
      </div>
    </div>
  );
}

export default Gamepage;