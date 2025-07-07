import React from 'react';

export default function SkeletonCollections() {
  return (
    <section className="py-20 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-10 w-1/2 mx-auto bg-gray-200 rounded mb-4" />
          <div className="h-6 w-1/3 mx-auto bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {[1,2,3,4].map(idx => (
            <div key={idx} className="bg-gray-100 rounded-2xl overflow-hidden shadow-md flex flex-col h-[48rem] w-full max-w-xl mx-auto">
              <div className="relative h-3/4 min-h-[32rem] bg-gray-200" />
              <div className="p-6 flex-1 flex flex-col justify-between items-center text-center">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-4" />
                <div className="mt-4 h-12 w-40 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 