import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../lib/productData';
import { motion, useAnimation } from 'framer-motion';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProducts } from './ProductContext';
import SkeletonProductPage from './ui/SkeletonProductPage';
// Eyes on Fire - Cloudinary URLs
const eyes1 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751504686/1_cv88jr.png';
const eyes2 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751504688/2_jrcchd.png';
const eyes3 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751504963/3_wsjayy.png';
const eyes4 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751504962/4_gjpvdv.png';
// Fatebound - Cloudinary URLs
const fate1 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505403/1_xn5lvc.png';
const fate2 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505401/2_speddb.png';
const fate3 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505416/3_idyoca.png';
const fate4 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505405/4_wvelai.png';
const fate5 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505409/5_bzkimm.png';
const fate6 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505403/6_u67bv0.png';
// Heaven last puff - Cloudinary URLs
const heaven1 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505831/1_mi1iiv.png';
const heaven2 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505832/2_nc925z.png';
const heaven3 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505872/3_dgy7xy.png';
const heaven4 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505876/4_t5w7co.png';
const heaven5 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751505874/5_x1rwqd.png';
// Overwhelmed Tee - Cloudinary URLs
const over2 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751506039/2_mqdpff.png';
const over3 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751506039/3_rrqzsn.png';
const over4 = 'https://res.cloudinary.com/dueddncka/image/upload/v1751506043/4_etwajj.png';
const over5jpg = 'https://res.cloudinary.com/dueddncka/image/upload/v1751506043/5_qgv8qk.jpg';

const cartPageImages: Record<number, string[]> = {
  1: [eyes1, eyes2, eyes3, eyes4], // Eyes on Fire
  2: [fate1, fate2, fate3, fate4, fate5, fate6], // Fatebound
  3: [heaven1, heaven2, heaven3, heaven4, heaven5], // Heaven last puff
  4: [over2, over3, over4, over5jpg], // Overwhelmed Tee
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart, buyNow, refreshBackendCart } = useCart();
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const { products: backendProducts, loading: productsLoading } = useProducts();
  const [addToCartMessage, setAddToCartMessage] = useState<string | null>(null);
  const [addToCartError, setAddToCartError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Use cart page images for the current product by id
  const images = product ? cartPageImages[product.id] || [] : [];
  const [currentImg, setCurrentImg] = useState(0);
  const controls = useAnimation();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Drag/swipe logic
  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    let newIndex = currentImg;
    if (offset < -50 || velocity < -500) {
      newIndex = Math.min(currentImg + 1, images.length - 1);
    } else if (offset > 50 || velocity > 500) {
      newIndex = Math.max(currentImg - 1, 0);
    }
    setCurrentImg(newIndex);
  };

  React.useEffect(() => {
    if (loadedImages.size >= images.length && images.length > 0) {
      setShowSkeleton(false);
    }
  }, [loadedImages, images.length]);

  // Fallback: hide skeleton after 2 seconds regardless
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

  if (!product) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-white py-20">
        <div className="max-w-2xl w-full bg-gray-100 rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-4 text-black">Product Not Found</h1>
        </div>
      </section>
    );
  }

  // Debug: log backend products and frontend product name
  console.log('Backend products:', backendProducts);
  console.log('Frontend product name:', product.name);

  // Find backend product by name (case-insensitive, trimmed)
  const backendProduct = backendProducts.find(p => p.name.trim().toLowerCase() === product.name.trim().toLowerCase());
  const backendProductId = backendProduct?._id;

  return (
    <div className="relative">
      {showSkeleton && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <SkeletonProductPage />
        </div>
      )}
      <section className="min-h-screen flex flex-col items-center justify-center py-20" style={{ background: '#FFF8F0' }}>
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Left: Thumbnails */}
          {/* <div className="flex flex-col gap-2 items-center mr-4"> ... </div> */}
          {/* Center: Main Image/Slider */}
          <div className="flex-1 flex flex-col items-center bg-gray-100 rounded-2xl p-4 max-w-lg w-full">
            <div className="w-full aspect-[4/5] flex items-center justify-center overflow-hidden rounded-xl relative">
              <motion.div
                className="w-full h-full flex"
                style={{ x: `-${currentImg * 100}%` }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{ x: `-${currentImg * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                ref={sliderRef}
              >
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-contain flex-shrink-0"
                    style={{ minWidth: '100%' }}
                    loading="lazy"
                    onLoad={() => handleImageLoad(img)}
                  />
                ))}
              </motion.div>
              {/* Slider controls */}
              {currentImg > 0 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                  onClick={() => setCurrentImg((prev) => prev - 1)}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
              )}
              {currentImg < images.length - 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white"
                  onClick={() => setCurrentImg((prev) => prev + 1)}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              )}
              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full ${currentImg === idx ? 'bg-black' : 'bg-gray-400'} transition`}
                    onClick={() => setCurrentImg(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Horizontal Thumbnails */}
            <div className="flex flex-row gap-2 items-center mt-4 overflow-x-auto w-full justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`border-2 rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 focus:outline-none transition-all ${currentImg === idx ? 'border-black' : 'border-transparent'}`}
                  onClick={() => setCurrentImg(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  style={{ background: '#fff' }}
                >
                  <img src={img} alt={product.name} className="w-full h-full object-contain" loading="lazy" onLoad={() => handleImageLoad(img)} />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col items-start w-full max-w-xl">
            {product.badge && (
              <span className="mb-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{product.badge}</span>
            )}
            <h1 className="text-4xl font-bold mb-2 text-black">{product.name}</h1>
            <div className="text-2xl font-semibold mb-4 text-black">799 <span className="text-base font-normal text-gray-500">INR</span></div>
            <div className="mb-4">
              <div className="font-semibold mb-2 text-black">Select Size</div>
              <div className="flex gap-4 flex-nowrap overflow-x-auto w-full gap-2 -mx-4 px-4">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md text-black font-medium focus:outline-none transition-all ${
                      !product.availableSizes.includes(size)
                        ? 'bg-gray-200 text-gray-400 line-through cursor-not-allowed'
                        : selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white hover:bg-gray-100 border-gray-300'
                    }`}
                    disabled={!product.availableSizes.includes(size)}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mb-6 w-full">
              <button 
                className="flex-1 py-3 rounded-md bg-black text-white font-bold text-lg hover:bg-gray-900 transition"
                onClick={async () => {
                  setAddToCartError(null);
                  setAddToCartMessage(null);
                  if (!selectedSize) {
                    setAddToCartError('Please select a size');
                    return;
                  }
                  addToCart({
                    id: backendProductId || '',
                    name: product.name,
                    price: Number((product.price.match(/\d+/) || ['799'])[0]),
                    size: selectedSize || '',
                    quantity: 1,
                  });
                  setAddToCartMessage('Added to cart!');
                  refreshBackendCart();
                }}
              >
                ADD TO CART
              </button>
              <button 
                className="flex-1 py-3 rounded-md border border-black text-black font-bold text-lg hover:bg-gray-100 transition"
                onClick={async () => {
                  setAddToCartError(null);
                  setAddToCartMessage(null);
                  if (!selectedSize) {
                    setAddToCartError('Please select a size');
                    return;
                  }
                  buyNow({
                    id: backendProductId || '',
                    name: product.name,
                    price: Number((product.price.match(/\d+/) || ['799'])[0]),
                    size: selectedSize || '',
                    quantity: 1,
                  });
                  navigate('/cart');
                }}
              >
                BUY IT NOW
              </button>
            </div>
            {addToCartError && <div className="text-red-600 text-sm font-semibold mb-2">{addToCartError}</div>}
            {addToCartMessage && <div className="text-green-600 text-sm font-semibold mb-2">{addToCartMessage}</div>}
            <div className="text-gray-700 text-base mb-4">{product.lore}</div>
            <button className="px-4 py-2 rounded-md border border-black text-black font-semibold hover:bg-gray-100 transition">READ LORE</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage; 