import React, { useEffect } from 'react';

function CursorParticles() {
  useEffect(() => {
    function spawnParticle(e) {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 700);
    }
    window.addEventListener('mousemove', spawnParticle);
    return () => window.removeEventListener('mousemove', spawnParticle);
  }, []);
  return null;
}

export default CursorParticles;