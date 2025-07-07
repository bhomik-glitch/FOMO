import React from 'react';

const FAQ: React.FC = () => (
  <section className="py-20 bg-black min-h-screen">
    <div className="max-w-3xl mx-auto px-4 text-gray-200">
      <h1 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>
      <div className="mb-8">
        <h2 className="font-semibold text-lg text-white mb-2">How do I place an order?</h2>
        <p>Simply browse our shop, add your favorite items to the cart, and proceed to checkout. You'll receive a confirmation email after your order is placed.</p>
      </div>
      <div className="mb-8">
        <h2 className="font-semibold text-lg text-white mb-2">What payment methods do you accept?</h2>
        <p>We accept all major credit/debit cards, UPI, and select wallets.</p>
      </div>
      <div className="mb-8">
        <h2 className="font-semibold text-lg text-white mb-2">How can I track my order?</h2>
        <p>Once your order is shipped, you'll receive a tracking link via email or SMS.</p>
      </div>
      <div className="mb-8">
        <h2 className="font-semibold text-lg text-white mb-2">How do I contact support?</h2>
        <p>Email us at <a href="mailto:wearfomoo@gmail.com" className="underline text-violet-400">wearfomoo@gmail.com</a> and we'll get back to you as soon as possible.</p>
      </div>
    </div>
  </section>
);

export default FAQ; 