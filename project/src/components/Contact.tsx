import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  // Updated contact info (no address)
  const contactInfo = [
    { icon: Mail, label: "Email", value: "wearfomoo@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 89294 13216" }
  ];

  // Instagram social link with clean URL
  const socialLinks = [
    { icon: Instagram, label: "Instagram", handle: "@wearfomoo", url: "https://www.instagram.com/wearfomoo/" }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            GET IN <span className="text-black">TOUCH</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to join the FOMOO family? Reach out and let's create something electric together.
          </p>
        </div>
        {/* Random text section */}
        <div className="mb-8 p-4 bg-gray-100 rounded-lg text-black text-lg text-center">
          Got a question, feedback, or just want to say hi? We're always here to help you out. Drop us a message or reach out directly—let's make your FOMOO experience unforgettable!
        </div>
        {/* Contact Info */}
        <div className="space-y-8 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-center space-x-4 justify-center">
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
        <div className="mt-12">
          <h3 className="text-xl font-bold text-black mb-6 text-center">FOLLOW THE MOVEMENT</h3>
          <div className="flex justify-center">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 cursor-pointer group justify-center"
              >
                <social.icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{social.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;