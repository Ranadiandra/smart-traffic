import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./quis.css";
import soalBg from "./assets/background_soal.png";
import kartuKtp from "./assets/kartu_ktp.png";
import kartuKredit from "./assets/kartu_kredit.png";
import kartuSim from "./assets/kartu_sim.png";
import lampuHijau from "./assets/lampu_hijau.png";
import lampuKuning from "./assets/lampu_kuning.png";
import lampuMerah from "./assets/lampu_merah.png";
import clickRightSound from "./assets/sounds/click-right.mp3";
import clickWrongSound from "./assets/sounds/wrong.mp3";

const soalList = [
  {
    nomor: 1,
    pertanyaan: "Apa yang dimaksud dengan lalu lintas?",
    tipe: "pilihan",
    jawaban: [
      "Pergerakan kendaraan di jalan raya",
      "Interaksi antara kendaraan, pejalan kaki, dan jalan",
      "Peraturan perjalanan antar kota",
    ],
    benar: 1,
  },
  {
    nomor: 2,
    pertanyaan: "Manakah yang merupakan gambar kartu SIM?",
    tipe: "gambar",
    gambar: [kartuKtp, kartuKredit, kartuSim],
    label: ["A", "B", "C"],
    benar: 2,
  },
  {
    nomor: 3,
    pertanyaan: "Syarat seseorang boleh mengendarai kendaraan bermotor adalah…",
    tipe: "pilihan",
    jawaban: [
      "Pengendara berumur 17 tahun",
      "Pengendara yang mempunyai SIM",
      "Pengendara yang mempunyai STNK",
    ],
    benar: 1,
  },
  {
    nomor: 4,
    pertanyaan:
      "Kecepatan maksimum yang diperbolehkan saat berada di perkotaan, yaitu..",
    tipe: "pilihan",
    jawaban: ["50 km/jam", "80 km/jam", "30 km/jam"],
    benar: 0,
  },
  {
    nomor: 5,
    pertanyaan:
      "Lampu lalu lintas mana yang yang menandakan kita harus berhenti?",
    tipe: "gambar",
    gambar: [lampuHijau, lampuKuning, lampuMerah],
    label: ["A", "B", "C"],
    benar: 2,
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuisRandom() {
  const [soalAcak, setSoalAcak] = useState([]);
  const [idx, setIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const wrongAudioRef = useRef(null);

  useEffect(() => {
    setSoalAcak(shuffleArray(soalList));
    setIdx(0);
    setTimer(30);
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (!soalAcak.length) return;
    setDisplayedText("");
    let i = 0;
    const q = soalAcak[idx].pertanyaan;
    const interval = setInterval(() => {
      setDisplayedText(q.slice(0, i + 1));
      i++;
      if (i === q.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [soalAcak, idx]);

  useEffect(() => {
    if (showModal || timer <= 0) return;
    const timerInterval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer, showModal]);

  useEffect(() => {
    if (!showModal) return;
    if (isCorrect && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (!isCorrect && wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play();
    }
  }, [showModal, isCorrect]);

  useEffect(() => {
    if (timer <= 0 && !showModal) {
      setIsCorrect(false);
      setShowModal(true);
      if (wrongAudioRef.current) {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play();
      }
    }
  }, [timer, showModal]);

  if (!soalAcak.length) return null;
  const soal = soalAcak[idx];

  const handleAnswer = (ansIdx) => {
    if (showModal) return;
    setIsCorrect(ansIdx === soal.benar);
    setShowModal(true);
    if (ansIdx !== soal.benar && wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isCorrect) {
      if (idx < soalAcak.length - 1) {
        setIdx(idx + 1);
        setTimer(30);
      } else {
        // Selesai: unlock dragndrop dan kembali ke gamepage
        localStorage.setItem("dragndrop_unlocked", "true");
        navigate("/gamepage");
      }
    } else {
      setTimer(30);
    }
  };

  // Timer bar color logic
  let timerColor = "#22b322";
  if (timer <= 10) timerColor = "#f44336";
  else if (timer <= 20) timerColor = "#ffb300";
  const timerPercent = Math.max(0, (timer / 30) * 100);

  return (
    <div
      className="quis-bg"
      style={{
        backgroundImage: `url(${soalBg})`,
      }}
    >
      {/* Nomor Soal Box */}
      <div className="quis-nomor-box">
        Soal Nomor {idx + 1} / {soalAcak.length}
      </div>

      {/* Timer Bar */}
      <div className="quis-timer-bar-container">
        <svg
          width="100%"
          height="32"
          style={{ position: "absolute", top: -10 , left: 10 }}
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
        <span className="quis-timer-text">
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

      {/* Pertanyaan */}
      <div
        className="quis-question"
        style={{
          width: "480px",
          height: "80px",
          left: "30%",
          top: "19%",
          fontWeight: 800,
        }}
      >
        {displayedText}
      </div>

      {/* Jawaban */}
      {soal.tipe === "pilihan" ? (
        <>
          {soal.jawaban.map((j, i) => (
            <div
              key={i}
              className={`quis-answer quis-answer-${i + 1}`}
              onClick={() => handleAnswer(i)}
              tabIndex={0}
            >
              <span className="quis-answer-text">
                {String.fromCharCode(97 + i) + ". " + j}
              </span>
            </div>
          ))}
        </>
      ) : (
        <div className="quis-img-row">
          {soal.gambar.map((img, i) => (
            <div
              className="quis-img-col"
              onClick={() => handleAnswer(i)}
              tabIndex={0}
              key={i}
            >
              <img
                src={img}
                alt={`Pilihan ${soal.label[i]}`}
                className="quis-img"
              />
              <div className="quis-img-label">{soal.label[i]}</div>
            </div>
          ))}
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
            <div
              className="modal-svg"
              style={{ cursor: "pointer" }}
              onClick={handleCloseModal}
            >
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
                  Jawaban Kamu Benar!
                  <br />
                  {idx < soalAcak.length - 1
                    ? "Ayoo lanjut ke soal berikutnya!"
                    : "Kuis selesai, mantap!"}
                </>
              ) : (
                <>
                  Jawaban kamu belum tepat.
                  <br />
                  Coba lagi, ya!
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={clickRightSound} />
      <audio ref={wrongAudioRef} src={clickWrongSound} />
    </div>
  );
}

export default QuisRandom;
