"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled 
        ? "bg-black/20 backdrop-blur-lg py-4 shadow-cyan-500/40 shadow-lg" 
        : "bg-transparent py-6"}`}
  >
      
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white flex items-cent">
          <span className="text-blue-500">Fix</span>Team
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center"
          >
            Get Started
            <ChevronRight className="ml-1" size={16} />
          </Link>
        </nav>

        <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                  <ChevronRight className="ml-1" size={16} />
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
        
      </AnimatePresence>

    </header>
  )
}

