import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./gamepage.css";
import backgroundGame from "./assets/bg.png";
import logoLevel from "./assets/level.png";
import quisImg from "./assets/mode/quis.png";
import dragndropImg from "./assets/mode/dragndrop.png";
import findImg from "./assets/mode/find.png";
import gembokImg from "./assets/gembok.png";
import { getRandomFindOrder } from "./findLevels";

function Gamepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dragndropUnlocked, setDragndropUnlocked] = useState(false);
  const [findUnlocked, setFindUnlocked] = useState(false);
  const [showChampions, setShowChampions] = useState(false);
  const [dragndropKey, setDragndropKey] = useState(0);

  // Tambahkan ini agar status unlock selalu update saat kembali ke halaman ini
  useEffect(() => {
    const checkUnlock = () => {
      setDragndropUnlocked(
        localStorage.getItem("dragndrop_unlocked") === "true"
      );
      setFindUnlocked(localStorage.getItem("find_unlocked") === "true");
    };
    checkUnlock();
    window.addEventListener("focus", checkUnlock);
    return () => window.removeEventListener("focus", checkUnlock);
  }, []);

  useEffect(() => {
    setDragndropUnlocked(localStorage.getItem("dragndrop_unlocked") === "true");
    setFindUnlocked(localStorage.getItem("find_unlocked") === "true");

    // Champions modal logic: hanya jika find3 selesai
    const allUnlocked =
      localStorage.getItem("dragndrop_unlocked") === "true" &&
      localStorage.getItem("find_unlocked") === "true";
    const championsShown = localStorage.getItem("champions_shown") === "true";
    // Champions modal hanya muncul jika find3 yang mengatur champions_shown ke false
    if (allUnlocked && !championsShown) {
      setTimeout(() => setShowChampions(true), 600);
      localStorage.setItem("champions_shown", "true");
    }
  }, []);

  useEffect(() => {
    // Tampilkan popup hanya jika datang dari Find3 dengan benar
    if (
      location.state?.showChampions &&
      localStorage.getItem("champions_shown") === "false"
    ) {
      setShowChampions(true);
    }
  }, [location.state]);

  const handleCloseChampions = () => {
    setShowChampions(false);
    localStorage.setItem("champions_shown", "true");
    // Optionally, hapus state agar tidak muncul lagi saat reload
    window.history.replaceState({}, document.title);
  };

  const handleDragndropClick = () => {
    if (dragndropUnlocked) {
      setDragndropKey((prevKey) => prevKey + 1); // Perbarui key untuk memaksa reload
      navigate("/dragndrop");
    }
  };

  return (
    <div
      className="gamepage-bg"
      style={{ backgroundImage: `url(${backgroundGame})` }}
    >
      {/* Champions Modal */}
      {showChampions && (
        <div className="champions-backdrop">
          <div className="champions-popup">
            <div className="champions-title">🏆 Selamat, Champions! 🏆</div>
            <div className="champions-desc">
              Kamu telah menyelesaikan semua tantangan!
              <br />
              <span className="champions-unlock">Semua level telah terbuka.</span>
            </div>
            <div className="champions-trophy" onClick={handleCloseChampions}>
              <svg width="90" height="90" viewBox="0 0 90 90">
                <ellipse cx="45" cy="80" rx="22" ry="7" fill="#ffe066" opacity="0.5"/>
                <rect x="32" y="60" width="26" height="18" rx="8" fill="#ffe066" stroke="#d4af37" strokeWidth="2"/>
                <rect x="28" y="18" width="34" height="48" rx="17" fill="#ffe066" stroke="#d4af37" strokeWidth="3"/>
                <ellipse cx="45" cy="18" rx="17" ry="8" fill="#ffe066" stroke="#d4af37" strokeWidth="2"/>
                <text x="45" y="48" textAnchor="middle" fontSize="32" fill="#d4af37" fontWeight="bold" dy="0.3em">🏆</text>
              </svg>
            </div>
            <div className="champions-close-text">Klik piala untuk menutup</div>
          </div>
        </div>
      )}

      <img src={logoLevel} alt="Level Logo" className="gamepage-logo" />
      <div className="gamepage-btn-row">
        {/* Quiz Button */}
        <div
          className="gamepage-btn-col"
          style={{ position: "absolute", top: 30, left: 20 }}
        >
          <img
            src={quisImg}
            alt="Quiz"
            className="option-img"
            style={{ width: 210, height: 210 }}
            onClick={() => navigate("/quis")}
          />
        </div>
        {/* Drag n Drop Button */}
        <div
          className="gamepage-btn-col"
          style={{ position: "absolute", top: 50, left: 270 }}
        >
          <div style={{ position: "relative", width: 180, height: 180 }}>
            <img
              src={dragndropImg}
              alt="Drag n Drop"
              className="option-img"
              style={{
                width: 180,
                height: 180,
                filter: dragndropUnlocked
                  ? undefined
                  : "grayscale(1) brightness(0.7)",
                pointerEvents: dragndropUnlocked ? "auto" : "none",
                cursor: dragndropUnlocked ? "pointer" : "not-allowed",
              }}
              onClick={handleDragndropClick}
            />
            {!dragndropUnlocked && (
              <img
                src={gembokImg}
                alt="Terkunci"
                style={{
                  position: "absolute",
                  top: 110,
                  left: 65,
                  width: 50,
                  height: 50,
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
        {/* Find Button */}
        <div
          className="gamepage-btn-col"
          style={{ position: "absolute", top: 50, left: 490 }}
        >
          <div style={{ position: "relative", width: 180, height: 180 }}>
            <img
              src={findImg}
              alt="Find"
              className="option-img"
              style={{
                width: 180,
                height: 180,
                filter: findUnlocked
                  ? undefined
                  : "grayscale(1) brightness(0.7)",
                pointerEvents: findUnlocked ? "auto" : "none",
                cursor: findUnlocked ? "pointer" : "not-allowed",
              }}
              onClick={() => {
                if (findUnlocked) {
                  const order = getRandomFindOrder();
                  localStorage.setItem("find_order", JSON.stringify(order));
                  localStorage.setItem("find_index", "0");
                  navigate(order[0]);
                }
              }}
            />
            {!findUnlocked && (
              <img
                src={gembokImg}
                alt="Terkunci"
                style={{
                  position: "absolute",
                  top: 110,
                  left: 65,
                  width: 50,
                  height: 50,
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gamepage;
