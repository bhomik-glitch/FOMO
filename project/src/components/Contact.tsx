import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@fomoo.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Address", value: "123 Street Culture Ave, NYC 10001" }
  ];

  const socialLinks = [
    { icon: Instagram, label: "Instagram", handle: "@fomoo_official" },
    { icon: Twitter, label: "Twitter", handle: "@fomoo" },
    { icon: Facebook, label: "Facebook", handle: "/fomoo" },
    { icon: Youtube, label: "YouTube", handle: "/fomoo" }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            GET IN <span className="text-black">TOUCH</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to join the FOMOO family? Reach out and let's create something electric together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-8 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 uppercase tracking-wide">{info.label}</div>
                    <div className="text-lg font-semibold text-black">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold text-black mb-6">FOLLOW THE MOVEMENT</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
                  >
                    <social.icon className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">{social.handle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-black rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">SEND US A MESSAGE</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  MESSAGE
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;