import React from 'react';
import { Zap, Users, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "50K+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Globe, label: "Countries", value: "30+" },
    { icon: Zap, label: "Collections", value: "100+" }
  ];

  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ABOUT <span className="text-white">FOMOO</span>
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                FOMOO stands for more than just Fear of Missing Out.<br/>
                It's about the fear of not expressing, of staying silent when your soul screams for color, chaos, and confidence.
              </p>
              <p>
                We started FOMOO with one purpose — to turn emotion into fabric and attitude into style.<br/>
                Every stitch, every drop, every oversized silhouette is built for those who feel too much, dream too big, and refuse to blend in.
              </p>
              <p>
                We're not just a clothing brand.<br/>
                We are a movement of the misunderstood, the misfits, the rebels, and the loud hearts.<br/>
                From gritty street vibes to raw emotion-packed drops, our pieces reflect the world we live in — messy, bold, unfiltered.
              </p>
              <p>
                We don't follow trends.<br/>
                We set the tone — with oversized fits, bold graphics, and an unapologetic aesthetic.<br/>
                Whether it's your mood, your rage, your chill, or your hustle — FOMOO lets you wear what you feel.
              </p>
              <p>
                This isn't fashion. This is expression.<br/>
                This is FOMOO.
              </p>
              <p className="font-bold text-white">
                Don't miss out. Feel everything. Wear your world.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                JOIN THE MOVEMENT
              </button>
            </div>
            {/* Policy Links - directly below CTA */}
            <div className="w-full flex flex-wrap justify-center gap-6 mt-8 mb-2 text-sm">
              <Link to="/exchange-return" className="underline text-gray-400 hover:text-violet-400 transition-colors">Exchange & Return Policy</Link>
              <Link to="/faq" className="underline text-gray-400 hover:text-violet-400 transition-colors">FAQ</Link>
              <Link to="/terms" className="underline text-gray-400 hover:text-violet-400 transition-colors">Terms and Conditions</Link>
              <Link to="/privacy" className="underline text-gray-400 hover:text-violet-400 transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="FOMOO Brand"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/20"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-lg">
              EST. 2024
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;