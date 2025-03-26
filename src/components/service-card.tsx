"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  t: any
}

export default function ServiceCard({ icon, title, t, description, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-600/10 rounded-full blur-2xl group-hover:bg-cyan-600/20 transition-all duration-500"></div>

      <div className="w-16 h-16 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-600/30 transition-all">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>

      <Link
        href="#contact"
        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors group/link"
      >
        {t.cta.learnMore}
        <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  )
}

