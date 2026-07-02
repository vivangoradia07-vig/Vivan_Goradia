import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);

  const links = ['Home', 'About', 'Portfolio', 'Service', 'Contact'];

  useEffect(() => {
    // Intro animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        gsap.to(navRef.current, { y: '-100%', duration: 0.3, ease: 'power2.inOut' });
      } else {
        gsap.to(navRef.current, { y: '0%', duration: 0.3, ease: 'power2.out' });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { y: '0%', duration: 0.5, ease: 'power3.inOut' });
      gsap.fromTo('.mobile-link', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current, { y: '-100%', duration: 0.5, ease: 'power3.inOut' });
    }
  }, [isOpen]);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-heading font-bold text-white hover:text-primary transition-colors cursor-pointer" style={{ textShadow: '0 0 10px rgba(250, 204, 21, 0.5)' }}>
          VG
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-white hover:text-primary transition-colors relative group text-sm uppercase tracking-wider">
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="https://wa.me/919104993335"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black px-5 py-2 rounded-full font-semibold hover:scale-105 hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all"
          >
            Feedback
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-zinc-950/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center -translate-y-full"
      >
        <div className="flex flex-col gap-8 text-center">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              onClick={() => setIsOpen(false)}
              className="mobile-link text-4xl font-heading font-bold text-white hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <a 
            href="https://wa.me/919104993335"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mobile-link mt-8 bg-primary text-black px-8 py-3 rounded-full font-bold text-lg"
          >
            Add Testimonial
          </a>
        </div>
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass p-8 rounded-2xl w-full max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white">Add Testimonial</h2>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Name" className="bg-zinc-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
              <input type="text" placeholder="Role" className="bg-zinc-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" />
              <textarea placeholder="Message" rows="4" className="bg-zinc-800/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
              <button type="button" onClick={() => setShowModal(false)} className="bg-primary text-black font-bold py-3 rounded-lg hover:shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-shadow mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
