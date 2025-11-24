import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition() {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);
  const [fadeType, setFadeType] = useState('in'); // 'in' atau 'out'
  const prevPath = useRef(location.pathname);

  // Fade in saat pertama kali masuk halaman
  useEffect(() => {
    setFadeType('in');
    setShow(true);
    setVisible(true);

    const timeout = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Fade in setiap kali pindah halaman
  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      // Fade out dulu sebelum ganti halaman
      setFadeType('out');
      setShow(true);
      setVisible(true);

      const timeoutOut = setTimeout(() => {
        prevPath.current = location.pathname;
        setFadeType('in');
        setShow(true);
      }, 800); // durasi fade out

      const timeoutIn = setTimeout(() => {
        setShow(false);
      }, 1800); // total durasi out + in

      return () => {
        clearTimeout(timeoutOut);
        clearTimeout(timeoutIn);
      };
    }
  }, [location.pathname]);

  // Sembunyikan overlay setelah animasi selesai
  useEffect(() => {
    if (!show) {
      const timeout = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(timeout);
    } else {
      setVisible(true);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <>
      <div className={`page-transition-overlay ${fadeType} ${show ? 'show' : ''}`} />
      <style>{`
        .page-transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000; /* bisa diganti sesuai tema */
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          z-index: 9999;
        }
        .page-transition-overlay.in.show {
          opacity: 1; /* fade in */
        }
        .page-transition-overlay.out.show {
          opacity: 1; /* mulai terlihat sebelum fade out */
        }
        .page-transition-overlay.out {
          opacity: 0; /* fade out */
        }
      `}</style>
    </>
  );
}

export default PageTransition;
