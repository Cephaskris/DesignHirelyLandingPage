import { useEffect, useRef, useState } from 'react';

// The user provided a sequence of 298 frames. 
// The prompt asked to extract up to 90 frames.
const TOTAL_FRAMES = 298;
const MAX_FRAMES = 90;

export default function ScrollVideoBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const framesRef = useRef<(ImageBitmap | null)[]>([]);

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate step to limit frames to MAX_FRAMES
    const step = Math.max(1, Math.floor(TOTAL_FRAMES / MAX_FRAMES));
    const numFramesToLoad = Math.floor(TOTAL_FRAMES / step);

    const loadFrames = async () => {
      // Yield slightly to allow page render
      await new Promise(r => setTimeout(r, 300));
      
      const bitmaps: ImageBitmap[] = [];
      for (let i = 0; i < numFramesToLoad; i++) {
        if (!active) return;
        const frameNum = (i * step) + 1;
        const paddedNum = frameNum.toString().padStart(3, '0');
        // Fetch frames generated from ezgif
        const url = `/src/assets/frames/ezgif-frame-${paddedNum}.png`;
        
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          bitmaps.push(bitmap);
        } catch (e) {
          console.error("Error loading frame", i, e);
          break;
        }
      }

      if (active && bitmaps.length > 0) {
        framesRef.current = bitmaps;
        setReady(true);
      }
    };
    
    loadFrames();

    // Scroll scrubbing logic
    let smoothedProgress = 0;
    let targetProgress = 0;
    let rafId: number;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      
      // The layout spans Hero (100svh) + Spacer (80vh) + ActionCards (100svh) = 280vh.
      // The scrollable distance to clear this area is 280vh - 100vh (viewport) = 180vh.
      let p = scrollY / (innerHeight * 1.8);
      targetProgress = Math.max(0, Math.min(1, p));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial call

    const draw = () => {
      // Smooth with lerp: smoothed += (target - smoothed) * 0.12
      smoothedProgress += (targetProgress - smoothedProgress) * 0.12;

      if (framesRef.current.length > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        
        // Only resize canvas if needed
        const drawWidth = canvas.clientWidth * dpr;
        const drawHeight = canvas.clientHeight * dpr;
        if (canvas.width !== drawWidth || canvas.height !== drawHeight) {
          canvas.width = drawWidth;
          canvas.height = drawHeight;
        }
        
        const frameIndex = Math.min(
          framesRef.current.length - 1,
          Math.floor(smoothedProgress * framesRef.current.length)
        );
        const img = framesRef.current[frameIndex];
        
        if (img) {
          // Draw with object-cover math
          const imgRatio = img.width / img.height;
          const canvasRatio = canvas.width / canvas.height;
          let w, h, x, y;

          if (canvasRatio > imgRatio) {
            w = canvas.width;
            h = canvas.width / imgRatio;
            x = 0;
            // Pad from top by top-aligning the crop and adding extra pixels
            y = 0; 
          } else {
            h = canvas.height;
            w = canvas.height * imgRatio;
            x = (canvas.width - w) / 2;
            // Push video down by 10% of height to pad from top
            y = canvas.height * 0.1;
          }
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, x, y, w, h);
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      active = false;
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      framesRef.current.forEach(bmp => bmp?.close());
    };
  }, []); // Run only once

  return (
    <div className="fixed inset-0 z-0 bg-[#f3f3f3] overflow-hidden pointer-events-none md:pt-10">
      {/* 1. Poster <img> — full cover; fades out once canvas frame-cache is ready */}
      <img
        src="/src/assets/frames/ezgif-frame-001.png"
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
        alt="Video Poster"
      />
      
      {/* 
        Note: The <video> element and extraction logic is omitted 
        since the provided asset was a pre-extracted PNG sequence, 
        making the canvas approach standalone and 100% reliable. 
      */}

      {/* 3. <canvas> — full cover; draws scrubbed frames; fades in when ready */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
