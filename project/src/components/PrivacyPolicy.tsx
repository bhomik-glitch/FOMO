import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <section className="py-20 bg-black min-h-screen">
    <div className="max-w-3xl mx-auto px-4 text-gray-200">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="mb-4">Your privacy is important to us. This policy explains how Wearfomoo collects, uses, and protects your information.</p>
      <ul className="list-disc ml-6 space-y-2 mb-4">
        <li>We collect information you provide when placing an order or contacting us.</li>
        <li>Your data is used only to process orders and improve your experience.</li>
        <li>We do not sell or share your personal information with third parties except as required by law.</li>
        <li>By using our site, you consent to our privacy policy.</li>
      </ul>
      <p>For any privacy-related questions, contact us at <a href="mailto:wearfomoo@gmail.com" className="underline text-violet-400">wearfomoo@gmail.com</a>.</p>
    </div>
  </section>
);

export default PrivacyPolicy; 