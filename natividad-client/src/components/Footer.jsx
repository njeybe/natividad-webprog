import React from "react";
import logo from "../assets/images/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t-2 border-zinc-900 bg-zinc-50 py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={logo} alt="nativ logo" className="h-8 w-auto" />
          <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
            Joseph Brian Natividad | NU Manila
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/njeybe"
            className="text-[10px] font-bold uppercase border-b-2 border-zinc-900"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/njeybe/"
            className="text-[10px] font-bold uppercase border-b-2 border-zinc-900"
          >
            LinkedIn
          </a>
          <a
            href="mailto:natividadjosephbrian@gmail.com"
            className="text-[10px] font-bold uppercase border-b-2 border-zinc-900"
          >
            Gmail
          </a>
        </div>
        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
          &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
