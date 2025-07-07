import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import { Vortex } from './ui/vortex';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const words = [
    { text: "For", className: "text-white" },
    { text: "those", className: "text-white" },
    { text: "who", className: "text-white" },
    { text: "never", className: "text-white" },
    { 
      text: "MISSOUT",
      className: "text-red-600 font-bold"
    }
  ];
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen bg-black overflow-hidden">
      <Vortex containerClassName="absolute inset-0 w-full h-full" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="w-full">
          <div className="text-center">
            {/* Main heading */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4" style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.7), 0 0 40px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)',
                fontFamily: "'Gothic A1', sans-serif"
              }}>
                WEAR <span className="text-white">FOMOO</span>
              </h1>
            </div>

            {/* Subtitle with Typewriter Effect */}
            <div className="mb-12 flex justify-center w-full">
              <div className="text-center">
                <TypewriterEffectSmooth 
                  words={words}
                  className="!text-2xl !md:text-3xl !lg:text-4xl"
                  cursorClassName="bg-gray-400"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center">
              <button 
                className="group bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                onClick={() => navigate('/shop')}
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;