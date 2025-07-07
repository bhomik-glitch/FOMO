import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type {} from 'react';

interface TrailElement {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  delay: number;
}

export interface MouseTrailProps {
  trailLength?: number;
  trailColor?: string;
  trailOpacity?: number;
  blurAmount?: number;
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'difference' | 'exclusion';
  glowIntensity?: number;
  hideOnMobile?: boolean;
  maxFPS?: number;
  className?: string;
  zIndex?: number;
}

const TRAIL_ELEMENTS = 24;
const TRAIL_SIZE_HEAD = 22;
const TRAIL_SIZE_TAIL = 6;
const TRAIL_OPACITY_HEAD = 0.7;
const TRAIL_OPACITY_TAIL = 0.05;
const TRAIL_COLOR = '#b9fbc0';
const TRAIL_FOLLOW_SPEED = 0.45;

const MouseTrail: React.FC<MouseTrailProps> = ({
  trailLength = TRAIL_ELEMENTS,
  trailColor = TRAIL_COLOR,
  trailOpacity = TRAIL_OPACITY_HEAD,
  blurAmount = 8,
  blendMode = 'difference',
  glowIntensity = 30,
  hideOnMobile = true,
  maxFPS = 60,
  className = '',
  zIndex = 9999
}) => {
  const trailRef = useRef<TrailElement[]>([]);
  const mousePos = useRef<{ x: number; y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastTime = useRef<number>(0);
  const animationId = useRef<number>();
  const [, setTick] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const frameInterval = useMemo(() => 1000 / maxFPS, [maxFPS]);

  // Initialize trail elements
  const initializeTrail = useCallback(() => {
    const elements: TrailElement[] = [];
    for (let i = 0; i < trailLength; i++) {
      const t = i / (trailLength - 1);
      const size = TRAIL_SIZE_HEAD + (TRAIL_SIZE_TAIL - TRAIL_SIZE_HEAD) * t;
      const opacity = TRAIL_OPACITY_HEAD + (TRAIL_OPACITY_TAIL - TRAIL_OPACITY_HEAD) * t;
      elements.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        opacity,
        scale: 1,
        delay: 0
      });
    }
    trailRef.current = elements;
  }, [trailLength]);

  // Animation loop
  const animate = useCallback((currentTime: number) => {
    if (currentTime - lastTime.current < frameInterval) {
      animationId.current = requestAnimationFrame(animate);
      return;
    }
    lastTime.current = currentTime;
    if (trailRef.current.length > 0) {
      trailRef.current[0].x = mousePos.current.x;
      trailRef.current[0].y = mousePos.current.y;
      trailRef.current[0].scale = 1;
      for (let i = 1; i < trailRef.current.length; i++) {
        const leader = trailRef.current[i - 1];
        const follower = trailRef.current[i];
        const followSpeedAdjusted = TRAIL_FOLLOW_SPEED;
        follower.x += (leader.x - follower.x) * followSpeedAdjusted;
        follower.y += (leader.y - follower.y) * followSpeedAdjusted;
        follower.scale += (1 - follower.scale) * 0.2;
      }
    }
    setTick(t => t + 1);
    animationId.current = requestAnimationFrame(animate);
  }, [frameInterval]);

  // Mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Start animation
  useEffect(() => {
    if (isMobile && hideOnMobile) return;
    initializeTrail();
    animationId.current = requestAnimationFrame(animate);
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [isMobile, hideOnMobile, initializeTrail, animate]);

  if (isMobile && hideOnMobile) return null;

  return (
    <>
      <svg className="fixed inset-0 pointer-events-none" style={{ width: 0, height: 0 }}>
        <defs>
          <filter id="mouse-trail-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blurAmount} result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${glowIntensity} -10`}
              result="glow" 
            />
          </filter>
        </defs>
      </svg>
      <div
        className={`fixed pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{
          mixBlendMode: blendMode,
          filter: 'url(#mouse-trail-filter)',
          zIndex: zIndex
        }}
        aria-hidden="true"
      >
        {trailRef.current.map((trail, index) => {
          const t = index / (trailRef.current.length - 1);
          const size = TRAIL_SIZE_HEAD + (TRAIL_SIZE_TAIL - TRAIL_SIZE_HEAD) * t;
          const opacity = TRAIL_OPACITY_HEAD + (TRAIL_OPACITY_TAIL - TRAIL_OPACITY_HEAD) * t;
          return (
            <div
              key={index}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: trail.x - size / 2,
                top: trail.y - size / 2,
                width: size,
                height: size,
                backgroundColor: trailColor,
                opacity: opacity,
                boxShadow: `0 0 16px 2px ${trailColor}`,
                transition: 'none',
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default MouseTrail; 