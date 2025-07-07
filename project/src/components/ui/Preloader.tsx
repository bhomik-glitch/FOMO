import React, { useEffect, useState } from 'react';
import LetterGlitch from './LetterGlitch';

const Preloader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(true), 2000);
    const finishTimeout = setTimeout(() => onFinish && onFinish(), 3000);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ fontFamily: 'monospace' }}
    >
      <LetterGlitch
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        glitchSpeed={10}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
    </div>
  );
};

export default Preloader; 