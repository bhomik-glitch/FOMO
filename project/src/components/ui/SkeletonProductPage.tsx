import React from 'react';

export default function SkeletonProductPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20" style={{ background: '#FFF8F0' }}>
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start animate-pulse">
        {/* Left: Thumbnails */}
        <div className="flex flex-col gap-2 items-center mr-4">
          {[1,2,3,4].map(idx => (
            <div key={idx} className="w-20 h-20 mb-2 bg-gray-200 rounded-lg" />
          ))}
        </div>
        {/* Center: Main Image/Slider */}
        <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-2xl p-4 max-w-lg w-full">
          <div className="w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-xl bg-gray-200" />
        </div>
        {/* Right: Product Info */}
        <div className="flex-1 flex flex-col items-start w-full max-w-xl">
          <div className="mb-2 w-24 h-6 bg-gray-200 rounded-full" />
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-2" />
          <div className="h-8 w-32 bg-gray-200 rounded mb-4" />
          <div className="mb-4">
            <div className="h-5 w-24 bg-gray-200 rounded mb-2" />
            <div className="flex gap-4">
              {[1,2,3,4].map(idx => (
                <div key={idx} className="px-4 py-2 bg-gray-200 rounded-md w-16 h-8" />
              ))}
            </div>
          </div>
          <div className="flex gap-4 mb-6 w-full">
            <div className="flex-1 h-12 bg-gray-200 rounded-md" />
            <div className="flex-1 h-12 bg-gray-200 rounded-md" />
          </div>
          <div className="h-20 w-full bg-gray-200 rounded mb-2" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </section>
  );
} 