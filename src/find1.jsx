import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./find.css";
import bgImg from "./assets/bg.png";
import boardBg from "./assets/background_find.png";
import mobilHitam from "./assets/find/find_mobilhitam.png";
import mobilKuning from "./assets/find/find_mobilkuning.png";
import mobilMerah from "./assets/find/find_mobilmerah.png";
import motor from "./assets/find/find_motor.png";
import clickRightSound from "./assets/sounds/click-right.mp3";
import wrongSound from "./assets/sounds/wrong.mp3";
import failSound from "./assets/sounds/fail.mp3"; // Tambahkan import fail.mp3

const tataCaraText = (
  <div className="find-modal-text">
    <b>Cara Bermain Find the Violators: Traffic</b>
    <ol style={{ textAlign: "left", marginTop: 12 }}>
      <li>Lihat gambar baik-baik.</li>
      <li>Cari objek yang melanggar aturan lalu lintas.</li>
      <li>Klik atau ketuk objek tersebut.</li>
      <li>Baca penjelasan tentang pelanggarannya.</li>
    </ol>
  </div>
);

export default function Find1() {
  const [showModal, setShowModal] = useState(true);
  const [timer, setTimer] = useState(45);
  const [timerActive, setTimerActive] = useState(true);
  const [modalType, setModalType] = useState(""); // "win", "lose", "timeout"
  const [modalDesc, setModalDesc] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false); // Flag untuk navigasi
  const navigate = useNavigate();
  const confettiColors = [
    "#FFD700",
    "#FF69B4",
    "#00CFFF",
    "#7CFC00",
    "#FF6347",
    "#FFB347",
    "#40E0D0",
    "#FF8C00",
    "#8A2BE2",
    "#00FF7F",
    "#FF1493",
    "#1E90FF",
  ];
  const audioWin = React.useRef(null);
  const audioLose = React.useRef(null);
  const audioFail = React.useRef(null); // Tambahkan ref untuk fail

  useEffect(() => {
    if (modalType === "win" && showModal) {
      audioWin.current?.play();
    } else if (modalType === "lose" && showModal) {
      audioLose.current?.play();
    } else if (modalType === "timeout" && showModal) {
      audioFail.current?.play();
    }
  }, [modalType, showModal]);

  // Timer logic
  useEffect(() => {
    if (!timerActive || showModal) return;
    if (timer <= 0) {
      setModalType("timeout");
      setModalDesc("Waktu anda Habis, Silahkan Coba lagi");
      setShowModal(true);
      setTimerActive(false);
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, showModal]);

  // Timer bar color logic
  let timerColor = "#22b322"; // green
  if (timer <= 10) timerColor = "#f44336";
  else if (timer <= 20) timerColor = "#ffb300";
  const timerPercent = Math.max(0, (timer / 45) * 100);

  // Handler klik objek
  const handleObjClick = (obj) => {
    if (showModal) return;
    setTimerActive(false);
    if (obj === "motor") {
      setModalType("win");
      setModalDesc("Pengendara ini Parkir Sembarangan !!!");
      setShowModal(true);
      setShouldNavigate(true); // Set flag untuk navigasi
    } else {
      setModalType("lose");
      setModalDesc("Pengendara ini Taat pada aturan !!!");
      setShowModal(true);
    }
  };

  // Handler close modal
  const handleCloseModal = () => {
    setShowModal(false);

    // Jika ini modal menang dan shouldNavigate true, lakukan navigasi
    if (modalType === "win" && shouldNavigate) {
      // Ambil urutan random dari localStorage
      const order = JSON.parse(
        localStorage.getItem("find_order") || '["/find1","/find2","/find3"]'
      );
      let idx = parseInt(localStorage.getItem("find_index") || "0", 10);
      idx++;
      localStorage.setItem("find_index", idx.toString());
      if (idx < order.length) {
        navigate(order[idx]);
      } else {
        // Selesai, kembali ke gamepage
        navigate("/gamepage");
      }
      return;
    }

    // Reset state untuk modal kalah atau timeout
    setTimer(45);
    setTimerActive(true);
    setModalType("");
    setModalDesc("");
    setShouldNavigate(false);
  };

  return (
    <>
      <audio ref={audioWin} src={clickRightSound} />
      <audio ref={audioLose} src={wrongSound} />
      <audio ref={audioFail} src={failSound} />{" "}
      {/* Tambahkan elemen audio fail */}
      <div
        className="find1-bg"
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          width: "100vw",
          height: "100vh",
          background: `url(${bgImg}) center/cover no-repeat fixed`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        {/* Modal Tata Cara */}
        {showModal && modalType === "" && (
          <div className="find-modal-backdrop">
            <div className="find-modal-popup">
              {tataCaraText}
              <button
                className="find-modal-btn"
                onClick={() => setShowModal(false)}
                autoFocus
              >
                Mengerti
              </button>
            </div>
          </div>
        )}

        {/* Modal Menang/Kalah/Timeout */}
        {showModal && modalType !== "" && (
          <div className="find-modal-backdrop">
            <div
              className={`find-modal-popup ${
                modalType === "win" ? "modal-correct" : "modal-wrong"
              }`}
              style={{
                borderColor: modalType === "win" ? "#7be36a" : "#f44336",
              }}
            >
              <div
                className="modal-emoji-row"
                style={{ fontSize: "2rem", marginBottom: 8 }}
              >
                {modalType === "win" ? (
                  <>
                    <span role="img" aria-label="party">
                      🎉
                    </span>
                    <span role="img" aria-label="party">
                      🎉
                    </span>
                  </>
                ) : (
                  <>
                    <span role="img" aria-label="sad">
                      😢
                    </span>
                    <span role="img" aria-label="sad">
                      😢
                    </span>
                  </>
                )}
              </div>
              <div
                className="modal-title"
                style={{
                  color: modalType === "win" ? "#43b000" : "#f44336",
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                {modalType === "win"
                  ? "Selamat!"
                  : modalType === "timeout"
                  ? "Ups! Waktu Habis"
                  : "Ups!"}
              </div>
              <div
                className="modal-svg"
                style={{ cursor: "pointer" }}
                onClick={handleCloseModal}
              >
                {modalType === "win" ? (
                  // SVG Ceklis
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="38"
                      fill="#eaffea"
                      stroke="#4caf50"
                      strokeWidth="4"
                    />
                    <polyline
                      points="25,43 38,56 57,29"
                      fill="none"
                      stroke="#4caf50"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // SVG X
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="38"
                      fill="#ffeaea"
                      stroke="#f44336"
                      strokeWidth="4"
                    />
                    <line
                      x1="28"
                      y1="28"
                      x2="52"
                      y2="52"
                      stroke="#f44336"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <line
                      x1="52"
                      y1="28"
                      x2="28"
                      y2="52"
                      stroke="#f44336"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              <div
                className="modal-desc"
                style={{
                  color: "#222",
                  fontSize: "1.15rem",
                  marginBottom: 12,
                  fontWeight: 500,
                }}
              >
                {modalDesc}
              </div>
            </div>
            {/* Confetti jatuh jika menang */}
            {modalType === "win" && (
              <div className="fall-screen-group">
                {Array.from({ length: 40 }).map((_, i) => {
                  const left = Math.random() * 96;
                  const color =
                    confettiColors[
                      Math.floor(Math.random() * confettiColors.length)
                    ];
                  const delay = (Math.random() * 0.7).toFixed(2);
                  const duration = (1.2 + Math.random() * 0.8).toFixed(2);
                  const rotate = Math.floor(Math.random() * 360);
                  return (
                    <div
                      key={i}
                      className="fall-confetti"
                      style={{
                        left: `${left}%`,
                        background: color,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                        transform: `rotate(${rotate}deg)`,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Board di tengah */}
        <div
          className="find-board"
          style={{
            position: "relative",
            background: "#fff",
            border: "6px solid #004984",
            borderRadius: "32px",
            boxShadow: "0 8px 32px #0003",
            width: 900,
            maxWidth: "95vw",
            minHeight: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 32px 24px 32px",
            zIndex: 2,
          }}
        >
          {/* Judul */}
          <div
            style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#004984",
              marginBottom: 12,
              textAlign: "center",
              letterSpacing: 1,
              textShadow: "0 2px 12px #fff8",
            }}
          >
            Find the Violators: Traffic
          </div>

          {/* Timer */}
          <div
            style={{
              width: 340,
              maxWidth: "90vw",
              margin: "0 auto 18px auto",
              position: "relative",
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="100%"
              height="32"
              style={{ position: "absolute", left: 0, top: 0 }}
            >
              <rect
                x="0"
                y="8"
                rx="16"
                ry="16"
                width="100%"
                height="20"
                fill="#e0e0e0"
              />
              <rect
                x="0"
                y="8"
                rx="16"
                ry="16"
                width={`${timerPercent}%`}
                height="20"
                fill={timerColor}
                style={{ transition: "width 0.5s, fill 0.5s" }}
              />
            </svg>
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: 8,
                transform: "translateX(-50%)",
                color: "#004984",
                fontSize: "1.1rem",
                fontWeight: "bold",
                letterSpacing: 1,
                textShadow: "0 2px 8px #fff8",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="20"
                height="20"
                style={{ verticalAlign: "middle", marginRight: 4 }}
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  fill="#fff"
                  stroke={timerColor}
                  strokeWidth="2"
                />
                <path
                  d="M10 5v5l3 3"
                  stroke={timerColor}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              {timer} detik
            </span>
          </div>

          {/* Board background image */}
          <div
            style={{
              width: 800,
              maxWidth: "90vw",
              maxHeight: "90vm",
              height: 490,
              background: `url(${boardBg}) center/cover no-repeat`,
              borderRadius: "18px",
              marginTop: 18,
              marginBottom: 18,
              boxShadow: "0 4px 18px #0001",
              border: "2px solid #004984",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Objek-objek */}
            <img
              src={mobilHitam}
              alt="Mobil Hitam"
              className="obj-mobil-hitam"
              onClick={() => handleObjClick("mobilHitam")}
              style={{ cursor: "pointer" }}
              tabIndex={0}
            />
            <img
              src={mobilKuning}
              alt="Mobil Kuning"
              className="obj-mobil-kuning"
              onClick={() => handleObjClick("mobilKuning")}
              style={{ cursor: "pointer" }}
              tabIndex={0}
            />
            <img
              src={mobilMerah}
              alt="Mobil Merah"
              className="obj-mobil-merah"
              onClick={() => handleObjClick("mobilMerah")}
              style={{ cursor: "pointer" }}
              tabIndex={0}
            />
            <img
              src={motor}
              alt="Motor"
              className="obj-motor"
              onClick={() => handleObjClick("motor")}
              style={{ cursor: "pointer" }}
              tabIndex={0}
            />
          </div>
          {/* Teks kedap-kedip di bawah board */}
          <div className="find-blink-text">
            Carilah Pengendara yang melanggar lalu lintas pada foto berikut.
          </div>
        </div>
      </div>
    </>
  );
}
