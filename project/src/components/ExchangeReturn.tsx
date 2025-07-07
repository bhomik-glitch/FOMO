import React from 'react';

const ExchangeReturn: React.FC = () => (
  <section className="py-20 bg-black min-h-screen">
    <div className="max-w-3xl mx-auto px-4 text-gray-200">
      <h1 className="text-4xl font-bold text-white mb-8">Exchange & Return Policy</h1>
      <p className="mb-4">At Wearfomoo, we want you to love what you wear. If something isn't right, we're here to help. Please review our exchange and return policy below:</p>
      <div className="mb-4">
        <h2 className="font-semibold text-lg text-white mb-2">Eligibility for Exchange or Return</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>✅ Items are eligible for exchange or return within 5–7 days of delivery.</li>
          <li>✅ Products must be unused, unwashed, and in their original packaging with all tags attached.</li>
          <li>✅ Items showing signs of wear, damage, or alteration will not be accepted.</li>
          <li>✅ Exchanges and returns apply only to items purchased directly from Wearfomoo (official website or Instagram).</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-lg text-white mb-2">Non-Returnable Items</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>🚫 Discounted or sale items</li>
          <li>🚫 Customized or personalized products</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-lg text-white mb-2">Exchange Process</h2>
        <p>Contact us at <a href="mailto:wearfomoo@gmail.com" className="underline text-violet-400">wearfomoo@gmail.com</a> within 5–7 days of receiving your order, including your order number and reason for exchange.</p>
        <p>We will guide you through the return shipping process.</p>
        <p>Once we receive and inspect the returned product, your exchange will be shipped within 3–5 days (subject to stock availability).</p>
        <p>Return shipping costs are usually borne by the customer, unless the product was damaged or incorrect.</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold text-lg text-white mb-2">Return & Refund Process</h2>
        <p>Email us at <a href="mailto:wearfomoo@gmail.com" className="underline text-violet-400">wearfomoo@gmail.com</a> with your order number and reason for return.</p>
        <p>We will provide the return shipping instructions.</p>
        <p>After inspecting the returned item, a refund will be issued to your original payment method within 5–7 business days.</p>
        <p>Please note that original shipping fees are non-refundable unless the return is due to our error.</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg text-white mb-2">Damaged or Incorrect Items</h2>
        <p>If you receive a damaged or incorrect item, please contact us within 48 hours of delivery by emailing <a href="mailto:wearfomoo@gmail.com" className="underline text-violet-400">wearfomoo@gmail.com</a> with clear photos, and we will resolve the issue as quickly as possible.</p>
      </div>
    </div>
  </section>
);

export default ExchangeReturn; 