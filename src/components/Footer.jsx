import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-primary overflow-hidden py-20 z-30">
      
      {/* Animated Background Marquee Typography Layers */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 overflow-hidden mix-blend-overlay">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full overflow-hidden whitespace-nowrap">
            <h2 
              className="text-[12vw] font-heading font-black text-black uppercase leading-none"
              style={{ 
                animation: `marquee ${40 + i * 10}s linear infinite ${i % 2 !== 0 ? 'reverse' : 'normal'}`
              }}
            >
              VIVAN • PORTFOLIO • CREATIVE • DEVELOPER • VIVAN • PORTFOLIO • CREATIVE • DEVELOPER •
            </h2>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Profile Showcase */}
        <div className="relative mb-10 group">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110">
            <img 
              src="/Profile.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-16">
          <a
            href="https://www.instagram.com/vivan_goradiya_03?igsh=MWIzMWxkYmtkdzlnZQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:shadow-[0_0_30px_rgba(37,99,235,0.9)] hover:scale-105 transition-all"
          >
            Follow
          </a>
          <a
            href="https://www.instagram.com/vivan_goradiya_03?igsh=MWIzMWxkYmtkdzlnZQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Message
          </a>
        </div>

        {/* Luxury Branding */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight">
            <span className="text-black">Vivan</span><span className="text-white drop-shadow-md">Goradia</span>
          </h1>
          <p className="text-black/80 font-medium mt-2 tracking-widest uppercase text-sm">
            Crafting Digital Excellence
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {['Home', 'About', 'Portfolio', 'Service', 'Contact'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              className="text-black font-bold uppercase tracking-widest text-sm hover:text-white transition-colors relative group"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl h-px bg-black/20 rounded-full mb-8"></div>

        {/* Copyright */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-4 text-black/70 text-xs font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Lema.web. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
