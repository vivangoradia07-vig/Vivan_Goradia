import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);

  const projects = [
    { title: "Awwwards Site", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "E-Commerce", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Dashboard UI", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Banking App", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Social Media", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { title: "Web3 NFT", img: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ];

  useEffect(() => {
    // 3D Folder opening animation on scroll (Desktop)
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        }
      });

      // Open the folder
      tl.to(folderFrontRef.current, {
        rotateX: -130,
        duration: 1,
        ease: "power2.inOut"
      });

      // Explode the cards
      cardsRef.current.forEach((card, index) => {
        // Calculate spread positions
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 350;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius - 150;

        tl.to(card, {
          x: x,
          y: y,
          z: 50 * index,
          rotate: (Math.random() - 0.5) * 30,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.5");
      });
      
      // Infinite floating animation for cards
      cardsRef.current.forEach((card, index) => {
        gsap.to(card, {
          y: "+=15",
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    });

    return () => mm.revert(); // Cleanup
  }, []);

  return (
    <section ref={containerRef} id="portfolio" className="relative h-screen w-full bg-[#f7f6f2] overflow-hidden flex items-center justify-center pt-20 perspective-[2000px]">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Massive Background Text */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-heading font-black text-black/5 uppercase whitespace-nowrap pointer-events-none select-none">
        MY WORK
      </h2>

      {/* Desktop 3D Folder & Cards */}
      <div className="hidden md:flex relative w-64 h-48 justify-center items-center z-10">
        
        {/* Folder Back */}
        <div className="absolute inset-0 bg-[#e5b800] rounded-t-xl rounded-b-md shadow-2xl origin-bottom" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}></div>
        
        {/* Project Cards inside folder */}
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="absolute top-0 left-0 w-64 h-80 bg-white/20 backdrop-blur-xl rounded-[28px] overflow-hidden border border-white/40 shadow-2xl opacity-0 scale-50 group cursor-pointer"
            style={{ transformOrigin: 'center center' }}
          >
            <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="text-white font-bold tracking-wider uppercase border border-white/50 px-6 py-2 rounded-full backdrop-blur-md">Explore</span>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-1.5 rounded-full backdrop-blur-md text-black font-bold text-sm">
              {project.title}
            </div>
          </div>
        ))}

        {/* Folder Front Flap */}
        <div 
          ref={folderFrontRef}
          className="absolute inset-0 bg-primary rounded-t-lg rounded-b-md shadow-[0_-5px_20px_rgba(0,0,0,0.2)] origin-bottom z-50 flex items-center justify-center border-t border-yellow-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-16 h-4 bg-yellow-600/30 rounded-full mb-32"></div>
        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div className="md:hidden w-full h-full flex flex-col justify-center pb-20 z-10">
        <h3 className="text-center text-4xl font-heading font-black text-zinc-900 mb-8">Selected Works</h3>
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-8 pb-10" style={{ scrollbarWidth: 'none' }}>
          {projects.map((project, index) => (
            <div key={index} className="flex-shrink-0 w-[80vw] h-[60vh] snap-center rounded-[28px] overflow-hidden relative shadow-2xl border border-white/50 group">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-2xl">{project.title}</h4>
                <p className="text-white/70 text-sm mt-2">Swipe to explore more</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Projects;
