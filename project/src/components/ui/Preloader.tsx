import React, { useEffect, useState } from 'react';
import logo from '../../logo/WEARFOMOO LOGO -1.png';

const Preloader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);
  const [flashCount, setFlashCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (flashCount < 10) {
      const flashTimeout = setTimeout(() => {
        setVisible((v) => !v);
        setFlashCount((c) => (visible ? c + 1 : c));
      }, 120); // 120ms per flicker
      return () => clearTimeout(flashTimeout);
    } else {
      setFade(true);
      const finishTimeout = setTimeout(() => onFinish && onFinish(), 600);
      return () => clearTimeout(finishTimeout);
    }
  }, [flashCount, visible, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ fontFamily: 'monospace' }}
    >
      {visible && (
        <img src={logo} alt="Wear FOMO Logo" style={{ width: 120, height: 120 }} />
      )}
    </div>
  );
};

export default Preloader; 