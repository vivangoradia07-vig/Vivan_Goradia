import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Portfolio = () => {
  const containerRef = useRef(null);
  const maskRef = useRef(null);
  const textRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [bgColor, setBgColor] = useState('#ef4444');
  const [isHovering, setIsHovering] = useState(false);

  const colors = [
    { name: 'red', hex: '#ef4444' },
    { name: 'yellow', hex: '#f4c400' },
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
      className="relative min-h-[100svh] md:h-screen w-full overflow-hidden transition-colors duration-1000 ease-in-out cursor-crosshair flex items-center justify-center"
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
      <div 
        ref={imageContainerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] md:w-[450px] md:h-[600px] z-30 pointer-events-auto group rounded-xl overflow-hidden transition-all duration-500"
        style={{ 
          backgroundColor: bgColor,
          boxShadow: isHovering ? '0 20px 60px rgba(0,0,0,0.4), inset 0 0 30px rgba(255,255,255,0.2)' : '0 10px 40px rgba(0,0,0,0.2)'
        }}
      >
        <img 
          src="/Hero.png" 
          alt="Portfolio Abstract" 
          className="w-full h-full object-cover transition-all duration-700"
          style={{ 
            filter: isHovering ? 'blur(0px) brightness(1.05)' : 'blur(8px) brightness(0.95)'
          }}
        />
        {/* Animated Dashed Border / Marching Ants (simulated with CSS) */}
        <div className="absolute inset-[-10px] border-2 border-dashed border-white/50 rounded-xl transition-opacity duration-500" style={{ opacity: isHovering ? 0.8 : 0.5 }}></div>
        {/* Corner Handles */}
        <div className="absolute -top-3 -left-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-opacity duration-500" style={{ opacity: isHovering ? 1 : 0.6 }}></div>
        <div className="absolute -top-3 -right-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-opacity duration-500" style={{ opacity: isHovering ? 1 : 0.6 }}></div>
        <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-opacity duration-500" style={{ opacity: isHovering ? 1 : 0.6 }}></div>
        <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-opacity duration-500" style={{ opacity: isHovering ? 1 : 0.6 }}></div>
      </div>

      {/* Glass Blur Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 transition-all duration-500"
        style={{ 
          backdropFilter: isHovering ? 'blur(2px)' : 'blur(8px)',
          backgroundColor: isHovering ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.1)',
          mixBlendMode: 'overlay'
        }}
      ></div>

      {/* Mouse Reveal Mask (Desktop only) */}
      <div 
        ref={maskRef}
        className="hidden md:block absolute top-0 left-0 w-[280px] h-[280px] rounded-full pointer-events-none z-40 overflow-hidden transition-opacity duration-500"
        style={{ 
          opacity: isHovering ? 1 : 0.3,
          borderColor: isHovering ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
          boxShadow: isHovering ? '0 0 50px rgba(255,255,255,0.6), inset 0 0 30px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.5)' : '0 0 30px rgba(0,0,0,0.3), inset 0 0 15px rgba(255,255,255,0.2), 0 0 15px rgba(0,0,0,0.3)',
          willChange: 'transform'
        }}
      >
        <img 
         // src="/Hero.png" 
          alt="Sharp reveal" 
          className="absolute w-[450px] h-[600px] object-cover"
          style={{ 
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'brightness(1.1) contrast(1.2)'
          }}
        />
      </div>

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
