import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const wordsRef = useRef(null);

  const words = ["Developer", "Freelancer", "Designer", "Creator"];

  useEffect(() => {
    // Initial reveal animation
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    ).fromTo(imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=0.8"
    );

    // Continuous vertical text roll animation
    const wordTl = gsap.timeline({ repeat: -1 });
    words.forEach((word, i) => {
      wordTl.to(wordsRef.current, {
        y: `-${(i + 1) * 100}%`,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 2
      });
    });
/*
    // Scroll parallax effect
    gsap.to(textRef.current, {
      y: -150,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      }
    });

    gsap.to(imageRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      }
    });*/

    return () => {
      // No speech synthesis cleanup needed.
    };
  }, []);

  const socials = [
    { icon: <FaWhatsapp size={24} />, name: "WhatsApp", color: "hover:bg-green-500 hover:text-white", href: "https://wa.me/919104993335" },
    { icon: <FaInstagram size={24} />, name: "Instagram", color: "hover:bg-pink-500 hover:text-white", href: "https://www.instagram.com/vivan_goradiya_03?igsh=MWIzMWxkYmtkdzlnZQ==" },
    { icon: <FaLinkedin size={24} />, name: "LinkedIn", color: "hover:bg-blue-600 hover:text-white", href: "https://www.linkedin.com/in/vivan-goradia-63b224393/" },
    { icon: <FaGithub size={24} />, name: "GitHub", color: "hover:bg-white hover:text-black", href: "https://github.com/vivangoradia07-vig/Vivan_Goradia" }
  ];

  return (
    <section ref={heroRef} id="home" className="relative min-h-[100svh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-white pt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between h-full">
        
        {/* Left Section: Text Content */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <p className="text-primary font-semibold tracking-widest uppercase mb-4">Creative Developer</p>
          
          <h1 className="text-[12vw] leading-none lg:text-[8vw] font-heading font-black text-black uppercase tracking-tight">
            Hello, I'm
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>Vivan Goradia</span>
          </h1>
          
          <div className="h-[40px] md:h-[60px] overflow-hidden mt-2 lg:mt-4">
            <div ref={wordsRef} className="flex flex-col text-2xl md:text-4xl font-bold text-black">
              {words.map((word, idx) => (
                <div key={idx} className="h-[40px] md:h-[60px] flex items-center">{word}</div>
              ))}
              {/* Duplicate first word for seamless loop */}
              <div className="h-[40px] md:h-[60px] flex items-center">{words[0]}</div>
            </div>
          </div>
          
          <p className="mt-6 text-zinc-600 max-w-lg text-lg">
            Passionate Web Developer crafting modern, interactive and premium digital experiences with creative UI animations and futuristic design aesthetics.
          </p>

          <div className="flex gap-4 mt-8">
            {socials.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 flex items-center justify-center rounded-full border border-black/10 text-black shadow-lg transition-all duration-300 ${social.color} hover:-translate-y-1`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Right Section: Hero Image */}
        <div ref={imageRef} className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative mb-10 lg:mb-0 flex justify-center items-center">
          {/* Placeholder for the hero image */}
          <div className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-tr from-primary to-orange-400 drop-shadow-2xl opacity-90 blur-[2px] animate-pulse"></div>
          <img 
            src="/Profile.jpg" 
            alt="Hero Portrait" 
            className="absolute w-[280px] h-[280px] lg:w-[460px] lg:h-[460px] object-cover rounded-full shadow-2xl mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
