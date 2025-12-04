"use client";

// Stillerin yüklenmesi için bunu ekledik
import "./globals.css"; 

import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Home } from "lucide-react";

export default function GlobalNotFound() {
  return (
    // !!! İŞTE HATAYI ÇÖZEN KISIM: Kendi HTML ve BODY etiketleri !!!
    <html lang="en">
      <body className="bg-[#050505] text-white overflow-hidden antialiased h-screen w-full flex flex-col items-center justify-center font-mono selection:bg-green-500/30">
        
        {/* Arka Plan Efekti */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        {/* İçerik */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
          
          {/* 404 Glitch Metni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white/90 select-none">
              404
            </h1>
            <motion.span 
              className="absolute top-0 left-0 -ml-1 text-red-500 opacity-70 mix-blend-screen animate-pulse"
              animate={{ x: [-2, 2, -1, 0] }}
              transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
            >
              404
            </motion.span>
            <motion.span 
              className="absolute top-0 left-0 ml-1 text-blue-500 opacity-70 mix-blend-screen animate-pulse"
              animate={{ x: [2, -2, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 2 }}
            >
              404
            </motion.span>
          </motion.div>

          {/* Hata Mesajı */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-lg md:text-xl">
              <Terminal size={20} />
              <span>ERR_PAGE_NOT_FOUND</span>
            </div>
            <p className="text-zinc-500 max-w-md mx-auto">
              The requested path could not be found.
              <br />
              <span className="text-xs opacity-50">System halted.</span>
            </p>
          </div>

          <Link 
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 active:scale-95 transition-all"
          >
            <Home size={18} />
            <span>cd /home</span>
          </Link>
        </div>
      </body>
    </html>
  );
}