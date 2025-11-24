import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Homepage from "../homepage.jsx";
import Gamepage from "../gamepage.jsx";
import Modegame from "../modepage.jsx";
import CursorParticles from "../CursorParticles";
import PageTransition from "../PageTransition";
import backsound from "../assets/backsound.mp3";
import menuIcon from "../assets/button/menu.png";
import soundIcon from "../assets/button/sound.png";
import homeIcon from "../assets/button/home.png";
import Studypage from "../studypage.jsx";
import QuisRandom from "../QuisRandom.jsx";
import DragndropRandom from "../DragndropRandom.jsx";
import Find1 from "../find1.jsx";
import Find2 from "../find2.jsx";
import Find3 from "../find3.jsx";
import "./mobile.css";

function AppMobile() {
  const backsoundRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (backsoundRef.current) {
      backsoundRef.current.volume = 0.5;
      backsoundRef.current.loop = true;
      if (soundOn) {
        backsoundRef.current.play().catch(() => {});
      } else {
        backsoundRef.current.pause();
      }
    }
  }, [soundOn]);

  const handleMenuClick = () => setMenuOpen((v) => !v);
  const handleSoundClick = () => setSoundOn((v) => !v);

  return (
    <>
      <audio ref={backsoundRef} src={backsound} />
      <CursorParticles />
      <PageTransition />

      {/* Home Button */}
      {location.pathname !== "/" && (
        <img
          src={homeIcon}
          alt="Home"
          className="home-btn"
          onClick={() => navigate("/")}
          tabIndex={0}
          role="button"
          aria-label="Home"
        />
      )}

      {/* Stylish Menu */}
      <div className="menu-container">
        <img
          src={menuIcon}
          alt="Menu"
          className="menu-btn"
          onClick={handleMenuClick}
          tabIndex={0}
          role="button"
          aria-label="Menu"
        />
        <div className={`menu-dropdown${menuOpen ? " open" : ""}`}>
          <img
            src={soundIcon}
            alt={soundOn ? "Sound On" : "Sound Off"}
            className={`menu-item${soundOn ? "" : " off"}`}
            onClick={handleSoundClick}
            tabIndex={0}
            role="button"
            aria-label="Sound"
          />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/modegame" element={<Modegame />} />
        <Route path="/studypage" element={<Studypage />} />
        <Route path="/gamepage" element={<Gamepage />} />
        <Route path="/quis" element={<QuisRandom />} />
        <Route path="/dragndrop" element={<DragndropRandom />} />
        <Route path="/find1" element={<Find1 />} />
        <Route path="/find2" element={<Find2 />} />
        <Route path="/find3" element={<Find3 />} />
      </Routes>
    </>
  );
}

export default function AppMobileWithRouter() {
  return (
    <BrowserRouter>
      <AppMobile />
    </BrowserRouter>
  );
}