import React from 'react';

const SizeChart: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-20">
      <div className="max-w-2xl w-full bg-gray-100 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-black">Size Chart</h1>
        <img 
          src="https://res.cloudinary.com/dueddncka/image/upload/v1751881366/1_ykny7v.png" 
          alt="Size Chart" 
          className="w-full max-w-md rounded-lg border border-gray-300 object-contain bg-white" 
        />
      </div>
    </div>
  );
};

export default SizeChart; 