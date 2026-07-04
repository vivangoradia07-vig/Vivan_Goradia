import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socials = [
    { name: "WhatsApp", icon: <FaWhatsapp size={28} />, href: "https://wa.me/919104993335" },
    { name: "Instagram", icon: <FaInstagram size={28} />, href: "https://www.instagram.com/vivan_goradiya_03?igsh=MWIzMWxkYmtkdzlnZQ==" },
    { name: "LinkedIn", icon: <FaLinkedin size={28} />, href: "https://www.linkedin.com/in/vivan-goradia-63b224393/" },
    { name: "GitHub", icon: <FaGithub size={28} />, href: "https://github.com/vivangoradia07-vig/Vivan_Goradia" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hello Vivan, my name is ${formData.name || 'a visitor'}.${formData.email ? ` My email is ${formData.email}.` : ''} ${formData.message || 'I would like to connect.'}`;
    const whatsappUrl = `https://wa.me/919104993335?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-[#0a0a0a] rounded-t-[40px] flex items-center justify-center py-24 overflow-hidden z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Massive Background Typography */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-heading font-black text-white opacity-[0.03] tracking-tighter pointer-events-none select-none z-0">
        CONNECT
      </h2>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Main Heading */}
        <h3 className="text-[12vw] md:text-[8vw] font-heading font-black text-white uppercase tracking-tight text-center mb-16 leading-none">
          Let's Talk
        </h3>

        {/* Animated Social Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white transition-all duration-500 hover:bg-white hover:text-black hover:scale-105"
              style={{ boxShadow: '0 0 0 rgba(255,255,255,0)' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 40px rgba(255,255,255,0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Glassmorphism Contact Form */}
        <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-6">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                required
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message" 
              required
              rows="5"
              className="w-full bg-zinc-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none"
            ></textarea>
            <button 
              type="submit"
              className="w-full bg-white text-black uppercase tracking-widest font-bold py-4 rounded-xl transition-all duration-300 hover:bg-zinc-200"
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
