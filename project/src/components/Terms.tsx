import React from 'react';

const Terms: React.FC = () => (
  <section className="py-20 bg-black min-h-screen">
    <div className="max-w-3xl mx-auto px-4 text-gray-200">
      <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
      <p className="mb-4">Welcome to Wearfomoo. By using our website and purchasing our products, you agree to the following terms and conditions. Please read them carefully.</p>
      <ul className="list-disc ml-6 space-y-2 mb-4">
        <li>All content, products, and services are provided "as is" without warranties of any kind.</li>
        <li>Prices and availability of products are subject to change without notice.</li>
        <li>Unauthorized use of our content or products is strictly prohibited.</li>
        <li>We reserve the right to refuse service to anyone for any reason at any time.</li>
      </ul>
      <p>For any questions, please contact us at <a href="mailto:wearfomoo@gmail.com" className="underline text-violet-400">wearfomoo@gmail.com</a>.</p>
    </div>
  </section>
);

export default Terms; 