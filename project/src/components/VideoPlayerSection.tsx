import React from 'react';
import { useNavigate } from 'react-router-dom';

const videoSrc = "https://res.cloudinary.com/dueddncka/video/upload/v1751503652/fomo_final_umdbd9.mp4";

const VideoPlayerSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex flex-col items-center py-16 bg-black">
      <div className="max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5">
        <div className="aspect-video w-full">
          <button
            onClick={() => navigate('/shop')}
            className="w-full h-full p-0 m-0 border-none bg-transparent cursor-pointer"
            style={{ display: 'block' }}
            aria-label="Go to shop"
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover bg-black"
            />
          </button>
        </div>
      </div>
      <h2 className="mt-8 text-3xl md:text-4xl font-bold text-white text-center tracking-tight drop-shadow-lg">
        FOMOO Collection Preview
      </h2>
    </section>
  );
};

export default VideoPlayerSection; 