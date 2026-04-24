import React from "react";
import logo from "../assets/images/kraftine_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t-2 border-(--color-border) bg-(--color-surface) px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={logo} alt="Kraftin'e logo" className="h-8 w-auto" />
          <p className="text-[10px] uppercase font-bold tracking-widest text-(--color-muted)">
            Kraftin'e Floral Studio | Placeholder Branch
          </p>
          <p className="text-[11px] text-(--color-muted) font-text">
            Open Daily 9:00 AM - 8:00 PM
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/lkraftine"
            className="text-[10px] font-bold uppercase border-b-2 border-(--color-border) no-underline text-(--color-primary)"
          >
            Facebook
          </a>
          <a
            href="mailto:kriannelistine09@gmail.com"
            className="text-[10px] font-bold uppercase border-b-2 border-(--color-border) no-underline text-(--color-primary)"
          >
            Email
          </a>
          <a
            href="https://www.youtube.com/channel/UCYzY3MKv0EQm3505aWubptw"
            className="text-[10px] font-bold uppercase border-b-2 border-(--color-border) no-underline text-(--color-primary)"
          >
            Youtube
          </a>
        </div>
        <p className="text-[9px] font-bold text-(--color-muted) uppercase tracking-[0.3em]">
          &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
