'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure the Spline canvas gets pointer events after it loads
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      const canvas = container.querySelector('canvas');
      if (canvas) {
        canvas.classList.add('spline-canvas');
        canvas.style.pointerEvents = 'auto';
        canvas.style.touchAction = 'manipulation';
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // Also check immediately in case canvas already exists
    const existingCanvas = container.querySelector('canvas');
    if (existingCanvas) {
      existingCanvas.classList.add('spline-canvas');
      existingCanvas.style.pointerEvents = 'auto';
      existingCanvas.style.touchAction = 'manipulation';
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <div 
        ref={containerRef}
        className="spline-scene-container w-full h-full" 
        style={{ touchAction: 'manipulation', position: 'relative' }}
      >
        <Spline scene={scene} className={className} />
      </div>
    </Suspense>
  )
}


