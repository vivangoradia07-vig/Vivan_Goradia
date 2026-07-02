import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Portfolio = () => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const textRef = useRef(null);
  const [bgColor, setBgColor] = useState('#f4c400');

  const colors = [
    { name: 'yellow', hex: '#f4c400' },
    { name: 'red', hex: '#ef4444' },
    { name: 'green', hex: '#22c55e' },
    { name: 'purple', hex: '#a855f7' },
    { name: 'rose', hex: '#f43f5e' },
    { name: 'orange', hex: '#f97316' }
  ];

  useEffect(() => {
    // Mouse tracking for mask reveal
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const xTo = gsap.quickTo(maskRef.current, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(maskRef.current, "y", { duration: 0.4, ease: "power3" });

      const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - 140; // 140 is half of mask size (280)
        const y = e.clientY - rect.top - 140;
        xTo(x);
        yTo(y);
      };

      containerRef.current.addEventListener('mousemove', handleMouseMove);

      return () => {
        if(containerRef.current) containerRef.current.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out cursor-crosshair flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      
      {/* Background Typography */}
      <h2 
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-heading font-black text-white whitespace-nowrap select-none pointer-events-none"
      >
        P<span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>O</span>RTF<span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>O</span>LIO
      </h2>

      {/* Main Image Center Showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] md:w-[450px] md:h-[600px] z-10 pointer-events-none group">
        <img 
          src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Portfolio Abstract" 
          className="w-full h-full object-cover filter brightness-[0.85] rounded-lg transition-transform duration-700 group-hover:scale-105"
        />
        {/* Animated Dashed Border / Marching Ants (simulated with CSS) */}
        <div className="absolute inset-[-10px] border-2 border-dashed border-white/50 rounded-xl"></div>
        {/* Corner Handles */}
        <div className="absolute -top-3 -left-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <div className="absolute -top-3 -right-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
      </div>

      {/* Glass Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-[6px] pointer-events-none z-20 mix-blend-overlay opacity-50 bg-black/10"></div>

      {/* Mouse Reveal Mask (Desktop only) */}
      <div 
        ref={maskRef}
        className="hidden md:block absolute top-0 left-0 w-[280px] h-[280px] rounded-full pointer-events-none z-30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        style={{ backdropFilter: 'blur(0px)', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)' }}
      >
        {/* Inner content shown sharp through the mask */}
        <div className="w-[100vw] h-[100vh] absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" style={{ transform: 'none' }}>
           {/* We simulate the reveal by unblurring what's underneath. 
               In a real complex setup, this might use SVG masking or clip-path on a duplicate sharp layer.
               Here we use a trick: the mask itself has a sharp image inside it positioned absolutely inverse to mask movement. 
               Since it's complex to inverse-calc here without state, we will rely on a simpler visual effect: a sharp transparent circle that 'clears' the blur using backdrop-filter. */}
        </div>
      </div>
      
      {/* Alternate simpler mask approach using backdrop-filter */}
      <div 
        ref={maskRef}
        className="hidden md:block absolute top-0 left-0 w-[280px] h-[280px] border-2 border-white/30 pointer-events-none z-40 transition-transform duration-75"
        style={{ 
          borderRadius: '50%',
          backdropFilter: 'blur(0px) contrast(1.2)', 
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 100px rgba(0,0,0,0.8)' 
        }}
      ></div>

      {/* Color Selector */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-50 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setBgColor(c.hex)}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-125 ${bgColor === c.hex ? 'border-white scale-125' : 'border-transparent'}`}
            style={{ backgroundColor: c.hex }}
            aria-label={`Switch to ${c.name} background`}
          />
        ))}
      </div>

    </section>
  );
};

export default Portfolio;
