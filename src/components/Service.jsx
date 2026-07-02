import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "Business Website", tag: "Corporate", color: "#648c11", image: "/Buisness.jpg", desc: "Corporate websites optimized for conversion and premium branding." },
  { title: "Admin Dashboard", tag: "SaaS", color: "#ff4500", image: "/admin.jpg", desc: "Advanced dashboards with analytics and data visualization." },
  { title: "E-Commerce Store", tag: "Retail", color: "#000080", image: "/ecommerce.jpg", desc: "Luxury online shopping experiences with seamless checkout." },
  { title: "Full Stack Web App", tag: "App", color: "#ff0000", image: "/website.jpg", desc: "Scalable web applications with powerful backend systems." },
  { title: "Portfolio Website", tag: "Creative", color: "#fff000", image: "/portfolio.jpg", desc: "High-end portfolio experiences for creators and agencies." },
  { title: "Website Redesign", tag: "Design", color: "#f5f5f5", image: "/redesign.jpg", desc: "Modern redesigns with immersive animations and premium UI." }
];

const Service = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [bgColor, setBgColor] = useState('#b1ae18'); // Default dark

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin section and scrub through cards in a 3D half-circle
      const totalScroll = 500; // 500%
      const radius = 800; // Radius of the half-circle

      // Initially position cards off-screen
      gsap.set(cardsRef.current, {
        x: radius,
        y: 0,
        z: -1000,
        opacity: 0,
        rotationY: -45,
        scale: 0.5
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // Update background color based on active card
            const activeIndex = Math.min(
              Math.floor(progress * services.length),
              services.length - 1
            );
            // setBgColor(services[activeIndex].color); // Optional: change background, but it might be too jarring. We'll stick to dark for now or a subtle gradient.
          }
        }
      });

      services.forEach((_, i) => {
        const startProgress = i / services.length;
        const endProgress = (i + 1) / services.length;
        
        // Complex path animation for each card
        tl.to(cardsRef.current[i], {
          x: 0,
          y: 0,
          z: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut"
        }, startProgress * 10)
        .to(cardsRef.current[i], {
          x: -radius,
          z: -1000,
          rotationY: 45,
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "power1.inOut"
        }, endProgress * 10);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    /*<section ref={sectionRef} id="service" className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center justify-center transition-colors duration-1000">*/
      <section
  ref={sectionRef}
  id="service"
  style={{ backgroundColor: bgColor }}
  className="relative h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-1000"
>
      {/* Massive Transparent Outlined Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay opacity-30">
        <h2 className="text-[18vw] font-heading font-black text-transparent uppercase" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>
          SERVICES
        </h2>
      </div>

      {/* Desktop 3D Curved Carousel */}
      <div ref={containerRef} className="hidden md:flex relative w-full h-full items-center justify-center perspective-[1000px]">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="absolute w-[420px] h-[550px] bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 flex flex-col justify-between overflow-hidden group"
          >
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4" style={{ backgroundColor: service.color, color: '#fff' }}>
                {service.tag}
              </span>
              <h3 className="text-4xl font-heading font-bold text-white mb-4 leading-tight">{service.title}</h3>
              <p className="text-zinc-400 text-lg">{service.desc}</p>
            </div>
            
            <div className="relative z-10 w-full h-48 rounded-2xl overflow-hidden mt-6">
  <img
    src={service.image}
    alt={service.title}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
</div>
        { /* <div className="relative z-10 w-full h-48 rounded-2xl overflow-hidden mt-6 bg-zinc-800">
              <div className="w-full h-full bg-gradient-to-tr transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `linear-gradient(45deg, ${service.color}, transparent)` }}></div>
            </div>*/}
          </div>
        ))}
      </div>

      {/* Mobile Snap Scroll Slider */}
      <div className="md:hidden w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 gap-6 pt-20 pb-10" style={{ scrollbarWidth: 'none' }}>
        {services.map((service, index) => (
          <div key={index} className="flex-shrink-0 w-[80vw] h-[450px] snap-center bg-zinc-900/60 backdrop-blur-lg border border-white/10 rounded-[30px] p-6 flex flex-col justify-between relative overflow-hidden group">
            {/* Color Accent Background */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: service.color }}></div>
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ backgroundColor: service.color, color: '#fff' }}>
                {service.tag}
              </span>
              <h3 className="text-3xl font-heading font-bold text-white mb-3">{service.title}</h3>
              <p className="text-zinc-400 mb-4">{service.desc}</p>
              <div className="w-full h-32 rounded-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center self-end group-hover:bg-white group-hover:text-black transition-colors z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Service;
