import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import VideoPlayerSection from './components/VideoPlayerSection';
import Collections from './components/Collections';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseTrail from './components/MouseTrail';
import NavBar from './components/NavBar';
import PopupNotification from './components/ui/PopupNotification';
import Preloader from './components/ui/Preloader';

const About = lazy(() => import('./components/About'));
const ProductPage = lazy(() => import('./components/ProductPage'));
const LoginSignup = lazy(() => import('./components/LoginSignup'));
const Cart = lazy(() => import('./components/Cart'));
const ExchangeReturn = lazy(() => import('./components/ExchangeReturn'));
const FAQ = lazy(() => import('./components/FAQ'));
const Terms = lazy(() => import('./components/Terms'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const SizeChart = lazy(() => import('./components/SizeChart'));

function App() {
  const location = useLocation();
  // Popup notification logic
  const productNames = [
    "Heaven's Last Puff",
    "Overwhelmed Tee – Constricted Edition.",
    "Eyes on Fire – Midnight Drop",
    "Fatebound"
  ];
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState('');
  const popupTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupIntervalRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [preloaderDone, setPreloaderDone] = React.useState(location.pathname !== '/');

  // Function to show popup with random product
  const showRandomPopup = React.useCallback(() => {
    const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
    setPopupMessage(`Someone just bought ${randomProduct}`);
    setPopupVisible(true);
    // Hide after 5 seconds
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    popupTimeoutRef.current = setTimeout(() => setPopupVisible(false), 5000);
  }, []);

  // Set up random interval between 2-3 minutes
  React.useEffect(() => {
    // First popup after 45 seconds
    const firstTimeout = setTimeout(() => {
      showRandomPopup();
      // After first popup, schedule next popups at random intervals
      function scheduleNextPopup() {
        const min = 15 * 60 * 1000; // 15 minutes
        const max = 15 * 60 * 1000; // 15 minutes
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;
        popupIntervalRef.current = setTimeout(() => {
          showRandomPopup();
          scheduleNextPopup();
        }, delay);
      }
      scheduleNextPopup();
    }, 45000);
    return () => {
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
      if (popupIntervalRef.current) clearTimeout(popupIntervalRef.current);
      clearTimeout(firstTimeout);
    };
  }, [showRandomPopup]);

  React.useEffect(() => {
    if (location.pathname === '/') {
      setPreloaderDone(false);
      const timer = setTimeout(() => setPreloaderDone(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setPreloaderDone(true);
    }
  }, [location.pathname]);

  if (!preloaderDone) {
    return <Preloader onFinish={() => setPreloaderDone(true)} />;
  }

  return (
    <>
      <PopupNotification message={popupMessage} visible={popupVisible} />
      <MouseTrail 
        trailColor="#ffffff" 
        trailOpacity={0.8}
        blendMode="difference"
        glowIntensity={40}
      />
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <VideoPlayerSection />
              <Collections />
              <Footer />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Collections />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/exchange-return" element={<ExchangeReturn />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sizechart" element={<SizeChart />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;