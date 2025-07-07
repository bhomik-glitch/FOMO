import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../lib/productData';
import SkeletonCollections from './ui/SkeletonCollections';

interface Collection {
  id: number;
  name: string;
  description: string;
  image1: string;
  image2: string;
  price: string;
  badge?: string;
}

const Collections: React.FC = () => {
  const collections = products;

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());
  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    const totalImages = collections.reduce((sum, c) => sum + (c.images?.length || 0), 0);
    if (loadedImages.size >= totalImages && totalImages > 0) {
      setShowSkeleton(false);
    }
  }, [loadedImages, collections]);

  React.useEffect(() => {
    if (!showSkeleton) return;
    const timeout = setTimeout(() => setShowSkeleton(false), 2000);
    return () => clearTimeout(timeout);
  }, [showSkeleton]);

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  };

  return (
    <div className="relative">
      {showSkeleton && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <SkeletonCollections />
        </div>
      )}
      <section id="shop-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              OUR <span className="text-black">COLLECTIONS</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated selection of premium streetwear designed for the modern urban explorer
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {collections.map((collection, idx) => {
              const Card = (
                <div
                  key={collection.id}
                  className="group relative bg-black rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 shadow-md flex flex-col h-[48rem] w-full max-w-xl mx-auto cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(collection.id)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Badge */}
                  {collection.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        collection.badge === 'NEW' 
                          ? 'bg-white text-black' 
                          : 'bg-gray-300 text-black'
                      }`}>
                        {collection.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-3/4 min-h-[32rem] overflow-hidden">
                    <>
                      <img
                        src={collection.images[0]}
                        alt={collection.name}
                        className={`w-full h-full object-cover object-top absolute inset-0 transition-fade ${hoveredIndex === collection.id ? 'opacity-0 scale-100' : 'opacity-100 scale-105'}`}
                        style={{ zIndex: 1, willChange: 'opacity, transform' }}
                        loading="lazy"
                        onLoad={() => handleImageLoad(collection.images[0])}
                      />
                      <img
                        src={collection.images[1]}
                        alt={collection.name}
                        className={`w-full h-full object-cover object-top absolute inset-0 transition-fade ${hoveredIndex === collection.id ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                        style={{ zIndex: 2, willChange: 'opacity, transform' }}
                        loading="lazy"
                        onLoad={() => handleImageLoad(collection.images[1])}
                      />
                    </>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between items-center text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors duration-200">
                      {collection.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {collection.description}
                    </p>
                    <button className="mt-4 bg-white text-black rounded-lg px-6 py-3 font-semibold text-base hover:bg-gray-200 transition-colors duration-200 overflow-hidden relative group/button" style={{width: '160px', height: '48px'}}>
                      <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center transition-transform duration-300 group-hover/button:-translate-x-full z-10">
                        Buy Now
                      </span>
                      <span className="absolute left-0 top-0 w-full h-full flex items-center justify-center transition-transform duration-300 translate-x-full group-hover/button:translate-x-0 z-20">
                        799 INR
                      </span>
                    </button>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
              return (
                <Link to={`/product/${collection.id}`} key={collection.id} style={{ textDecoration: 'none' }}>
                  {Card}
                </Link>
              );
            })}
          </div>

          {/* Preload all images off-screen for smooth transitions */}
          <div style={{ display: 'none' }}>
            {collections.map((collection) => (
              <React.Fragment key={collection.id}>
                <img src={collection.images[0]} alt="" loading="lazy" onLoad={() => handleImageLoad(collection.images[0])} />
                <img src={collection.images[1]} alt="" loading="lazy" onLoad={() => handleImageLoad(collection.images[1])} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;