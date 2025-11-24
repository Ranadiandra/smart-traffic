import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DragndropRandom.css";
import bg2 from "./assets/bg.png";
import borderLarangan from "./assets/dragndrop_rambu/border_larangan.png";
import borderPerintah from "./assets/dragndrop_rambu/border_perintah.png";
import borderPeringatan from "./assets/dragndrop_rambu/border_petunjuk.png";
import rambuKlakson from "./assets/dragndrop_rambu/larangan_klakson.png";
import rambuMasuk from "./assets/dragndrop_rambu/larangan_masuk.png";
import rambuMobil from "./assets/dragndrop_rambu/larangan_mobil.png";
import rambuParkir from "./assets/dragndrop_rambu/larangan_parkir.png";
import perintahBelokKanan from "./assets/dragndrop_rambu/perintah_belokkanan.png";
import perintahBundaran from "./assets/dragndrop_rambu/perintah_bundaran.png";
import perintahJalurKhususBus from "./assets/dragndrop_rambu/perintah_jalurkhususbus.png";
import perintahSalahSatuJalur from "./assets/dragndrop_rambu/perintah_salahsatujalur.png";
import rambuJalanLicin from "./assets/dragndrop_rambu/peringatan_jalanlicin.png";
import rambuJalanMenanjak from "./assets/dragndrop_rambu/peringatan_jalanmenanjak.png";
import rambuLampuLalin from "./assets/dragndrop_rambu/peringatan_lampulalin.png";
import rambuTikungan from "./assets/dragndrop_rambu/peringatan_tikungan.png";
import rambuJalanTol from "./assets/dragndrop_rambu/petunjuk_jalantol.png";
import rambuPejalanKaki from "./assets/dragndrop_rambu/petunjuk_pejalankaki.png";
import rambuPomBensin from "./assets/dragndrop_rambu/petunjuk_pombensin.png";
import rambuRumahSakit from "./assets/dragndrop_rambu/petunjuk_rumahsakit.png";
import clickRightSound from "./assets/sounds/click-right.mp3";
import failSound from "./assets/sounds/fail.mp3";

// Data level dragndrop
const dragndropLevels = [
  {
    bg: bg2,
    border: borderLarangan,
    rambu: [
      { key: "parkir", label: "Dilarang Parkir", img: rambuParkir },
      { key: "masuk", label: "Dilarang Masuk", img: rambuMasuk },
      { key: "mobil", label: "Mobil Dilarang Masuk", img: rambuMobil },
      {
        key: "klakson",
        label: "Dilarang Membunyikan Klakson",
        img: rambuKlakson,
      },
    ],
  },
  {
    bg: bg2,
    border: borderPerintah,
    rambu: [
      {
        key: "belokkanan",
        label: "Wajib Belok Kanan",
        img: perintahBelokKanan,
      },
      {
        key: "bundaran",
        label: "Wajib Mengikuti Bundaran",
        img: perintahBundaran,
      },
      {
        key: "jalurkhususbus",
        label: "Jalur Khusus Bus",
        img: perintahJalurKhususBus,
      },
      {
        key: "salahsatujalur",
        label: "Salah Satu Jalur",
        img: perintahSalahSatuJalur,
      },
    ],
  },
  {
    bg: bg2,
    border: borderPeringatan,
    rambu: [
      { key: "jalanlicin", label: "Jalan Licin", img: rambuJalanLicin },
      {
        key: "jalanmenanjak",
        label: "Jalan Menanjak",
        img: rambuJalanMenanjak,
      },
      { key: "lampulalin", label: "Lampu Lalu Lintas", img: rambuLampuLalin },
      { key: "tikungan", label: "Jalan Tikungan", img: rambuTikungan },
    ],
  },
  {
    bg: bg2,
    border: borderPeringatan,
    rambu: [
      { key: "jalantol", label: "Jalan Tol", img: rambuJalanTol },
      {
        key: "pejalankaki",
        label: "Jalur Pejalan Kaki",
        img: rambuPejalanKaki,
      },
      { key: "pombensin", label: "Area Pom Bensin", img: rambuPomBensin },
      { key: "rumahsakit", label: "Area Rumah Sakit", img: rambuRumahSakit },
    ],
  },
];

// Fungsi shuffle
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function DragndropRandom() {
  const navigate = useNavigate();
  const [shuffledLevels, setShuffledLevels] = useState([]);
  const [levelIdx, setLevelIdx] = useState(0);
  const [dropped, setDropped] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [modalLocked, setModalLocked] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const audioRef = useRef(null);
  const failAudioRef = useRef(null);

  // Tambahkan state baru untuk drag items
  const [shuffledDragItems, setShuffledDragItems] = useState([]);

  // Confetti colors
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

  // Initialize shuffled levels pada mount pertama
  useEffect(() => {
    const shuffled = shuffleArray(dragndropLevels);
    // Shuffle rambu dalam setiap level juga
    const shuffledWithRambu = shuffled.map((level) => ({
      ...level,
      rambu: shuffleArray(level.rambu),
    }));
    setShuffledLevels(shuffledWithRambu);
  }, [navigate]); // Tambahkan `navigate` sebagai dependency untuk memicu ulang saat tombol ditekan

  // Reset dropped state dan acak drag items setiap kali level berubah
  useEffect(() => {
    if (shuffledLevels.length === 0) return;

    const currentLevel = shuffledLevels[levelIdx];
    const rambuKeys = currentLevel.rambu.map((r) => r.key);

    // Reset dropped state
    const initialDropped = {};
    rambuKeys.forEach((k) => {
      initialDropped[k] = false;
    });
    setDropped(initialDropped);

    // Acak hanya bagian drag
    const shuffledDrag = shuffleArray(currentLevel.rambu);
    setShuffledDragItems(shuffledDrag);

    // Reset timer dan modal
    setTimer(30);
    setTimerActive(true);
    setShowModal(false);
    setIsCorrect(false);
    setGameCompleted(false);
  }, [levelIdx, shuffledLevels]);

  // Single useEffect untuk mengecek apakah semua item sudah di-drop dengan benar
  useEffect(() => {
    if (
      !timerActive ||
      showModal ||
      gameCompleted ||
      shuffledLevels.length === 0 ||
      !dropped ||
      Object.keys(dropped).length === 0 ||
      Object.keys(dropped).length !== shuffledLevels[levelIdx].rambu.length
    ) {
      return;
    }

    const allDropped = Object.values(dropped).every(Boolean);
    if (allDropped) {
      setIsCorrect(true);
      setShowModal(true);
      setTimerActive(false);
      setGameCompleted(true);

      // Play success sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [dropped, levelIdx, timerActive, showModal, gameCompleted, shuffledLevels]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || showModal || gameCompleted) return;

    if (timer <= 0) {
      setIsCorrect(false);
      setShowModal(true);
      setTimerActive(false);

      // Play fail sound
      if (failAudioRef.current) {
        failAudioRef.current.currentTime = 0;
        failAudioRef.current.play();
      }
      return;
    }

    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, showModal, gameCompleted]);

  // Drag handler
  const handleDragStart = (e, key) => {
    e.dataTransfer.setData("rambu", key);
  };

  // Drop handler
  const handleDrop = (e, key) => {
    e.preventDefault();
    const draggedKey = e.dataTransfer.getData("rambu");
    if (draggedKey === key) {
      setDropped((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Timer bar color logic
  let timerColor = "#22b322";
  if (timer <= 10) timerColor = "#f44336";
  else if (timer <= 20) timerColor = "#ffb300";
  const timerPercent = Math.max(0, (timer / 30) * 100);

  // Modal close handler
  const handleCloseModal = () => {
    if (modalLocked) return;
    setModalLocked(true);

    setShowModal(false);
    setGameCompleted(false);

    if (isCorrect) {
      if (levelIdx < shuffledLevels.length - 1) {
        setLevelIdx(levelIdx + 1);
      } else {
        // Selesai semua level
        localStorage.setItem("find_unlocked", "true");
        navigate("/gamepage");
      }
    } else {
      setTimer(30);
      setTimerActive(true);
    }
    setTimeout(() => setModalLocked(false), 500);
  };

  // Jika shuffled levels belum ready, tampilkan loading atau return early
  if (shuffledLevels.length === 0) {
    return (
      <div
        className="dragndrop-bg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  const level = shuffledLevels[levelIdx];

  return (
    <div
      className="dragndrop-bg"
      style={{ backgroundImage: `url(${level.bg})` }}
    >
      <audio ref={audioRef} src={clickRightSound} />
      <audio ref={failAudioRef} src={failSound} />
      {/* Timer Bar */}
      <div className="quis-timer-bar-container">
        <svg width="100%" height="32" className="timer-bar-svg">
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
            className="timer-bar-rect"
          />
        </svg>
        <span className="quis-timer-text">
          <svg width="20" height="20" className="timer-bar-icon">
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
      <div className="dragndrop-container">
        {/* Drop Area */}
        <div className="drop-area-img">
          <img
            src={level.border}
            alt="Border Drop"
            className="border-drop-img"
          />
          <div className="drop-list">
            {level.rambu.map((item) => {
              const isRambuPetunjuk =
                level.border === borderPeringatan &&
                (item.key === "jalantol" ||
                  item.key === "pejalankaki" ||
                  item.key === "pombensin" ||
                  item.key === "rumahsakit");

              return (
                <div className="drop-row" key={item.key}>
                  <div
                    className={isRambuPetunjuk ? "drop-square" : "drop-circle"}
                    onDrop={(e) => handleDrop(e, item.key)}
                    onDragOver={handleDragOver}
                    style={{
                      background: dropped[item.key]
                        ? `url(${item.img}) center/cover no-repeat`
                        : "#bdbdbd",
                    }}
                  />
                  <span className="drop-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Drag Area */}
        <div className="drag-area-img">
          <div className="drag-rambu-list">
            {shuffledDragItems.map(
              (item) =>
                !dropped[item.key] && (
                  <img
                    key={item.key}
                    src={item.img}
                    alt={item.label}
                    className="drag-rambu-img"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.key)}
                  />
                )
            )}
          </div>
        </div>
      </div>
      {/* Fall down confetti */}
      {showModal && isCorrect && (
        <div className="fall-screen-group">
          {Array.from({ length: 40 }).map((_, i) => {
            const left = Math.random() * 96;
            const color =
              confettiColors[Math.floor(Math.random() * confettiColors.length)];
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
      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div
            className={`modal-popup ${
              isCorrect ? "modal-correct" : "modal-wrong"
            } fall-down`}
          >
            <div className="modal-emoji-row">
              {isCorrect ? (
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
            <div className="modal-title">{isCorrect ? "Selamat!" : "Ups!"}</div>
            <div className="modal-svg" onClick={handleCloseModal}>
              {isCorrect ? (
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
            <div className="modal-desc">
              {isCorrect ? (
                <>
                  Drag n Drop gambar berhasil disusun!
                  <br />
                  {levelIdx < shuffledLevels.length - 1
                    ? "Ayoo lanjut ke level berikutnyaa!"
                    : "Semua level selesai, mantap!"}
                </>
              ) : (
                <>
                  Waktu habis atau belum selesai.
                  <br />
                  Coba lagi, ya!
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DragndropRandom;