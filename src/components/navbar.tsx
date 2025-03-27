"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Globe } from 'lucide-react';
import { openJSON } from "@/utils/useGeoLocation";

interface Props {
  t: any;
  setT?: (translations: any) => void;
  currentLanguage?: string;
  setCurrentLanguage?: (lang: string) => void;
}

export default function Navbar({ t, setT, currentLanguage = "BR", setCurrentLanguage }: Props) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = async (lang: string) => {
    if (setT && setCurrentLanguage) {
      const translations = await openJSON(lang);
      setT(translations); // Atualizando a tradução do site!
      setCurrentLanguage(lang); // Atualizando o estado do idioma!
      
      // Salvando a preferência do usuário no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredLanguage', lang);
      }
      
      setLangMenuOpen(false); // Fechar o menu de idioma!
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${scrolled ? "bg-black/20 backdrop-blur-lg py-4 shadow-cyan-500/40 shadow-lg" : "bg-transparent py-6"}
      `}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" width={150} height={150} alt="Logo" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {t.navbar.map((link: any, index: number) => (
            <Link key={index} href={link.link} className="text-gray-300 hover:text-blue-400 transition-colors">
              {link.label}
            </Link>
          ))}

          {/* Botão de idioma - Desktop */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Globe size={20} className="mr-1" />
              <span>{currentLanguage === "BR" ? "PT" : "EN"}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => toggleLanguage("BR")}
                  className={`block w-full text-left px-4 py-2 ${
                    currentLanguage === "BR" ? "bg-blue-600" : "hover:bg-gray-700"
                  } text-white`}
                >
                  Português
                </button>
                <button
                  onClick={() => toggleLanguage("EN")}
                  className={`block w-full text-left px-4 py-2 ${
                    currentLanguage === "EN" ? "bg-blue-600" : "hover:bg-gray-700"
                  } text-white`}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <Link
            href="#contact"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center"
          >
            {t.cta.getStarted}
            <ChevronRight className="ml-1" size={16} />
          </Link>
        </nav>

        <div className="md:hidden flex items-center">
          {/* Botão de idioma - Mobile */}
          <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-gray-300 hover:text-white mr-4 flex items-center">
            <Globe size={20} />
          </button>

          <button className="text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu de idiomas - Mobile */}
      <AnimatePresence>
        {langMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute right-4 top-16 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <button
              onClick={() => toggleLanguage("BR")}
              className={`block w-full text-left px-4 py-2 ${
                currentLanguage === "BR" ? "bg-blue-600" : "hover:bg-gray-700"
              } text-white`}
            >
              Português
            </button>
            <button
              onClick={() => toggleLanguage("EN")}
              className={`block w-full text-left px-4 py-2 ${
                currentLanguage === "EN" ? "bg-blue-600" : "hover:bg-gray-700"
              } text-white`}
            >
              English
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {t.navbar.map((link: any, index: number) => (
                  <Link
                    key={index}
                    href={link.link}
                    className="text-gray-300 hover:text-blue-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t.cta.getStarted}
                  <ChevronRight className="ml-1" size={16} />
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
