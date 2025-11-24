import React from "react";
import "./studypage.css";

// Import semua gambar rambu larangan
import laranganKlakson from "./assets/dragndrop_rambu/larangan_klakson.png";
import laranganMasuk from "./assets/dragndrop_rambu/larangan_masuk.png";
import laranganMobil from "./assets/dragndrop_rambu/larangan_mobil.png";
import laranganParkir from "./assets/dragndrop_rambu/larangan_parkir.png";
import laranganBelokKanan from "./assets/dragndrop_rambu/larangan_belokkanan.png";
import laranganBelokKiri from "./assets/dragndrop_rambu/larangan_belokkiri.png";
import laranganBerhenti from "./assets/dragndrop_rambu/larangan_berhenti.png";
import laranganPutarBalik from "./assets/dragndrop_rambu/larangan_putarbalik.png";

// Import rambu perintah
import perintahArahKanan from "./assets/dragndrop_rambu/perintah_arahkanan.png";
import perintahBelokKanan from "./assets/dragndrop_rambu/perintah_belokkanan.png";
import perintahBundaran from "./assets/dragndrop_rambu/perintah_bundaran.png";
import perintahJalurKhususBus from "./assets/dragndrop_rambu/perintah_jalurkhususbus.png";
import perintahKecepatan from "./assets/dragndrop_rambu/perintah_kecepatan.png";
import perintahParkir from "./assets/dragndrop_rambu/perintah_parkir.png";
import perintahSalahSatuJalur from "./assets/dragndrop_rambu/perintah_salahsatujalur.png";
import perintahWajibDilewati from "./assets/dragndrop_rambu/perintah_wajibdilewati.png";

// Import rambu petunjuk
import petunjukBengkel from "./assets/dragndrop_rambu/petunjuk_bengkel.jpg";
import petunjukJalanBuntu from "./assets/dragndrop_rambu/petunjuk_jalanbuntu.png";
import petunjukJalanTol from "./assets/dragndrop_rambu/petunjuk_jalantol.png";
import petunjukPejalanKaki from "./assets/dragndrop_rambu/petunjuk_pejalankaki.png";
import petunjukPomBensin from "./assets/dragndrop_rambu/petunjuk_pombensin.png";
import petunjukRumahMakan from "./assets/dragndrop_rambu/petunjuk_rumahmakan.png";
import petunjukRumahSakit from "./assets/dragndrop_rambu/petunjuk_rumahsakit.png";
import petunjukTelepon from "./assets/dragndrop_rambu/petunjuk_telepon.png";

// Import rambu lain (contoh, tetap tampilkan)
import peringatanJalanBerlika from "./assets/dragndrop_rambu/peringatan_jalanberliku.png";
import peringatanJalanLicin from "./assets/dragndrop_rambu/peringatan_jalanlicin.png";
import peringatanJalanMenanjak from "./assets/dragndrop_rambu/peringatan_jalanmenanjak.png";
import peringatanKonstruksiJalan from "./assets/dragndrop_rambu/peringatan_konstruksijalan.png";
import peringatanLampuLalin from "./assets/dragndrop_rambu/peringatan_lampulalin.png";
import peringatanPersimpangan from "./assets/dragndrop_rambu/peringatan_persimpangan.png";
import peringatanTikungan from "./assets/dragndrop_rambu/peringatan_tikungan.png";
import peringatanTikunganTajam from "./assets/dragndrop_rambu/peringatan_tikungantajam.png";

// Daftar rambu dengan referensi ke variabel gambar
const rambuList = [
  // Rambu Larangan
  { img: laranganKlakson, label: "Larangan Klakson" },
  { img: laranganMasuk, label: "Larangan Masuk" },
  { img: laranganMobil, label: "Larangan Mobil" },
  { img: laranganParkir, label: "Larangan Parkir" },
  { img: laranganBelokKanan, label: "Larangan Belok Kanan" },
  { img: laranganBelokKiri, label: "Larangan Belok Kiri" },
  { img: laranganBerhenti, label: "Larangan Berhenti" },
  { img: laranganPutarBalik, label: "Larangan Putar Balik" },

  // Rambu Perintah
  { img: perintahArahKanan, label: "Perintah Arah Kanan" },
  { img: perintahBelokKanan, label: "Perintah Belok Kanan" },
  { img: perintahBundaran, label: "Perintah Bundaran" },
  { img: perintahJalurKhususBus, label: "Perintah Jalur Khusus Bus" },
  { img: perintahKecepatan, label: "Perintah Kecepatan" },
  { img: perintahParkir, label: "Perintah Parkir" },
  { img: perintahSalahSatuJalur, label: "Perintah Salah Satu Jalur" },
  { img: perintahWajibDilewati, label: "Perintah Wajib Dilewati" },

  // Rambu Peringatan
  { img: peringatanJalanBerlika, label: "Peringatan Jalan Berliku" },
  { img: peringatanJalanLicin, label: "Peringatan Jalan Licin" },
  { img: peringatanJalanMenanjak, label: "Peringatan Jalan Menanjak" },
  { img: peringatanKonstruksiJalan, label: "Peringatan Konstruksi Jalan" },
  { img: peringatanLampuLalin, label: "Peringatan Lampu Lalu Lintas" },
  { img: peringatanPersimpangan, label: "Peringatan Persimpangan" },
  { img: peringatanTikungan, label: "Peringatan Tikungan" },
  { img: peringatanTikunganTajam, label: "Peringatan Tikungan Tajam" },

  // Rambu Petunjuk
  { img: petunjukBengkel, label: "Bengkel Kendaraan" },
  { img: petunjukJalanBuntu, label: "Jalan Buntu" },
  { img: petunjukJalanTol, label: "Jalan Tol" },
  { img: petunjukPejalanKaki, label: "Jalur Pejalan Kaki" },
  { img: petunjukPomBensin, label: "Pom Bensin" },
  { img: petunjukRumahMakan, label: "Rumah Makan" },
  { img: petunjukRumahSakit, label: "Rumah Sakit" },
  { img: petunjukTelepon, label: "Telepon Umum" },
];

export default function Studypage() {
  // Fungsi untuk membacakan label rambu
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "id-ID";
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="study-container">
      <div>
        <h1 className="study-title">Kumpulan Rambu Lalu Lintas</h1>
        <div className="rambu-idcard-list">
          {rambuList.map((rambu, idx) => (
            <div
              className="rambu-idcard"
              key={idx}
              onClick={() => speak(rambu.label)}
              tabIndex={0}
              role="button"
              aria-label={rambu.label}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") speak(rambu.label);
              }}
            >
              <div className="rambu-img-box">
                <img
                  src={rambu.img}
                  alt={rambu.label}
                  className="rambu-img"
                />
              </div>
              <div className="rambu-label-box">
                <span className="rambu-label">{rambu.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}