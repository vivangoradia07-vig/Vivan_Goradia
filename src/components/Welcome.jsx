import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);

  const testimonials = [
    { name: "John Doe", role: "CEO, TechFlow", review: "An absolute masterclass in web design. The attention to detail is stunning.", img: "https://i.pravatar.cc/150?u=1" },
    { name: "Sarah Smith", role: "Creative Director", review: "Brought our vision to life with futuristic and cinematic animations.", img: "https://i.pravatar.cc/150?u=2" },
    { name: "Mike Johnson", role: "Founder, StartupX", review: "Premium quality work that immediately elevated our brand presence.", img: "https://i.pravatar.cc/150?u=3" },
    { name: "Emily Chen", role: "Marketing Head", review: "The smooth scrolling and glassmorphism effects are just mind-blowing.", img: "https://i.pravatar.cc/150?u=4" },
    { name: "Alex Turner", role: "Designer", review: "Incredible developer with an amazing eye for UI/UX motion.", img: "https://i.pravatar.cc/150?u=5" },
  ];

  useEffect(() => {
    // Parallax effect for the massive welcome text
    gsap.to(titleRef.current, {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative h-[200vh] w-full bg-gradient-to-b from-white to-zinc-100 flex flex-col items-center overflow-hidden">
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      {/* Screen 1: Welcome Typography Reveal */}
      <div className="h-screen w-full flex flex-col items-center justify-center relative sticky top-0">
        <h2 className="text-zinc-500 uppercase tracking-widest text-sm md:text-lg mb-2 font-semibold">To my creative space</h2>
        <h1 ref={titleRef} className="text-[28vw] font-heading font-black text-black leading-none opacity-15 tracking-tighter select-none pointer-events-none">
          WELCOME
        </h1>
        
        {/* Cinematic gradient fade to blend with next section */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-zinc-100 to-transparent"></div>
      </div>

      {/* Screen 2: Testimonials Marquee */}
      <div className="h-screen w-full flex flex-col justify-center relative z-10 bg-zinc-100 pb-20">
        <div className="text-center mb-16 px-6">
          <h3 className="text-primary font-bold uppercase tracking-widest mb-2">Client Love</h3>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-black">What people are saying</h2>
        </div>

        {/* Marquee Row 1 (Left to Right) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-8 relative">
          {/* Fades on edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-zinc-100 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zinc-100 to-transparent z-10"></div>
          
          <div ref={marqueeRef1} className="flex animate-marquee hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className="mx-4 w-[350px] md:w-[450px] bg-white/60 backdrop-blur-md border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex-shrink-0 flex flex-col gap-6 whitespace-normal group">
                <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed group-hover:text-black transition-colors">"{t.review}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-black flex items-center gap-1">
                      {t.name}
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    </h4>
                    <p className="text-zinc-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Row 2 (Right to Left) */}
        <div className="w-full overflow-hidden flex whitespace-nowrap relative">
           {/* Fades on edges */}
           <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-zinc-100 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-zinc-100 to-transparent z-10"></div>
          
          <div ref={marqueeRef2} className="flex animate-marquee hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse' }}>
            {[...testimonials.reverse(), ...testimonials].map((t, idx) => (
              <div key={idx} className="mx-4 w-[350px] md:w-[450px] bg-white/60 backdrop-blur-md border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 flex-shrink-0 flex flex-col gap-6 whitespace-normal group">
                <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed group-hover:text-black transition-colors">"{t.review}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-black flex items-center gap-1">
                      {t.name}
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    </h4>
                    <p className="text-zinc-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Welcome;
