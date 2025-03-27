"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Code,
  BotIcon as Robot,
  Globe,
  Users,
  Mail,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServiceCard from "@/components/service-card";
import ContactForm from "@/components/contact-form";
import Hero3DElement from "@/components/hero-3d-element";
import { geoModule, openJSON } from "@/utils/useGeoLocation";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  // Criando um loading, a tradução completa e o estado do idioma atual!
  const [loading, setLoading] = useState(true);
  const [t, setT]: any = useState({});
  const [currentLanguage, setCurrentLanguage] = useState("BR"); // Default to BR

  // Obtem todos os dados de geo localização e obtem a tradução do país para o idioma escolhido!
  useEffect(() => {
    if (loading === true) {
      const timer = setTimeout(async () => {
        // Primeiro verificamos se há uma preferência salva no localStorage
        let language = "BR";

        if (typeof window !== "undefined") {
          const savedLanguage = localStorage.getItem("preferredLanguage");
          if (savedLanguage) {
            // Se houver uma preferência salva, usamos ela
            language = savedLanguage;
          } else {
            // Caso contrário, usamos a geolocalização
            const geoData = await geoModule();
            language = geoData.country || "BR";
          }
        } else {
          // Fallback para servidor ou ambientes sem localStorage
          const geoData = await geoModule();
          language = geoData.country || "BR";
        }

        const tradutions = await openJSON(language);

        setT(tradutions);
        setCurrentLanguage(language);
        setLoading(false);
      }, 30);

      return () => clearTimeout(timer);
    }
  }, [loading, setLoading, setT]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Loading de tela em quanto carrega todas as traduções do site!
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          />
        </motion.div>
      </div>
    );
  }

  // Mostra o conteudo principal
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Navbar
        t={t}
        setT={setT}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
      <section className="relative min-h-screen pt-20 md:pt-0 flex items-center overflow-hidden pb-32 md:pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-blue-900/10 blur-3xl"></div>
          <div className="absolute blur-md inset-0 bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 z-10 pt-4 md:pt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 ">
                {t.home.title}
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                {t.home.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#services"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center justify-center group"
                >
                  {t.cta.ourServices}
                  <ChevronRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium transition-all flex items-center justify-center group"
                >
                  {t.cta.getInTouch}
                  <ChevronRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-full lg:w-1/2 relative mb-16 md:mb-0 "
            >
              <div
                className="w-full h-full flex justify-center items-center"
                style={{
                  pointerEvents: "none",
                }}
              >
                <div className="w-full h-[450px] md:h-[600px] lg:h-[800px]  flex justify-center items-end lg:-mt-16 md:-top-[430px] lg:flex lg:absolute md:hidden">
                  <Hero3DElement />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Link
            href="#services"
            className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors"
          >
            <span className="text-sm mb-2">{t.cta.discoverMore}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <ArrowRight className="transform rotate-90" size={24} />
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <section id="services" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t.services.title}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.services.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Robot size={40} />}
              title={t.services.rpa.title}
              description={t.services.rpa.description}
              delay={0.1}
              t={t}
            />
            <ServiceCard
              icon={<Code size={40} />}
              title={t.services.website.title}
              description={t.services.website.description}
              delay={0.3}
              t={t}
            />
            <ServiceCard
              icon={<Globe size={40} />}
              title={t.services.webApps.title}
              description={t.services.webApps.description}
              delay={0.5}
              t={t}
            />
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-6">{t.about.title}</h2>
              <p className="text-xl text-gray-300 mb-6">
                {t.about.description}
              </p>
              <p className="text-lg text-gray-400 mb-8">
                {t.about.additionalInfo}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{t.about.expertTeam.title}</h4>
                    <p className="text-gray-400">
                      {t.about.expertTeam.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">
                      {t.about.customSolutions.title}
                    </h4>
                    <p className="text-gray-400">
                      {t.about.customSolutions.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={"/tecnop.png"}
                  alt="FixTeam Team"
                  width={800}
                  height={800}
                  className="w-100 h-100 rounded-xs object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl z-0"></div>
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t.process.title}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.process.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.process.steps.map((step: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:border-cyan-700/90 relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-600/20 rounded-full blur-xl group-hover:bg-cyan-600/30  transition-all duration-500"></div>
                <span className="text-5xl font-bold text-cyan-600/80 mb-4 block">
                  {step.number}
                </span>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-gray-900/90"></div>
          <div className="absolute inset-0 bg-[url('https://media.discordapp.net/attachments/1350902210753728677/1350925233640701977/file-LtTerbga5QCpFkPiTpswCy.png?ex=67d92b6a&is=67d7d9ea&hm=e9ae0f2fa6acd000f5a8ead28a30d1e1310bafeb9dcf48c22509d91a6c1430c1&=&format=webp&quality=lossless&width=1512&height=864')] bg-cover bg-center opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t.cta_section.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t.cta_section.description}
            </p>

            <Link
              href="#contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-lg transition-all inline-flex items-center group"
            >
              {t.cta_section.button}
              <ChevronRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">
                {t.contact.form.getInTouch}
              </h3>
              <p className="text-gray-300 mb-8">
                {t.contact.form.formDescription}
              </p>

              <ContactForm t={t} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">
                {t.contact.info.title}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-gray-400">contact@fixteam.uk</p>
                    <p className="text-gray-400">support@fixteam.uk</p>
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0,0,256,256"
                    >
                      <g
                        fill="#63b3ed"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                      >
                        <g transform="scale(5.12,5.12)">
                          <path d="M18.90625,7c0,0 -6.36719,0.4375 -10.53125,3.78125c-0.01953,0.00781 -0.04297,0.01953 -0.0625,0.03125c-0.72266,0.66797 -1.26562,1.70313 -1.9375,3.1875c-0.67187,1.48438 -1.38281,3.39453 -2.03125,5.53125c-1.29297,4.27734 -2.34375,9.52734 -2.34375,14.46875c-0.00391,0.17578 0.03906,0.34766 0.125,0.5c1.46094,2.56641 4.14844,4.11719 6.65625,5.09375c2.50781,0.97656 4.82422,1.36719 6,1.40625c0.33203,0.01172 0.64844,-0.14062 0.84375,-0.40625l2.4375,-3.375c1.96484,0.46484 4.26953,0.78125 6.9375,0.78125c2.66797,0 4.97266,-0.31641 6.9375,-0.78125l2.4375,3.375c0.19531,0.26563 0.51172,0.41797 0.84375,0.40625c1.17578,-0.03906 3.49219,-0.42969 6,-1.40625c2.50781,-0.97656 5.19531,-2.52734 6.65625,-5.09375c0.08594,-0.15234 0.12891,-0.32422 0.125,-0.5c0,-4.94141 -1.05078,-10.19141 -2.34375,-14.46875c-0.64844,-2.13672 -1.35937,-4.04687 -2.03125,-5.53125c-0.67187,-1.48437 -1.21484,-2.51953 -1.9375,-3.1875c-0.01953,-0.01172 -0.04297,-0.02344 -0.0625,-0.03125c-4.16406,-3.34375 -10.53125,-3.78125 -10.53125,-3.78125c-0.07422,-0.00781 -0.14453,-0.00781 -0.21875,0c-0.34766,0.04688 -0.64062,0.27344 -0.78125,0.59375c0,0 -0.33984,0.74609 -0.5625,1.8125c-1.94922,-0.3125 -3.58984,-0.40625 -4.53125,-0.40625c-0.94141,0 -2.58203,0.09375 -4.53125,0.40625c-0.22266,-1.06641 -0.5625,-1.8125 -0.5625,-1.8125c-0.17187,-0.39062 -0.57422,-0.62891 -1,-0.59375zM18.28125,9.15625c0.07422,0.20313 0.125,0.39453 0.1875,0.625c-2.25391,0.52344 -4.72266,1.37891 -7.03125,2.8125c-0.36328,0.15234 -0.60156,0.50391 -0.61328,0.89844c-0.00781,0.39063 0.21484,0.75391 0.56641,0.92578c0.35547,0.16797 0.77734,0.11719 1.07813,-0.13672c4.63281,-2.87109 10.52734,-3.28125 12.53125,-3.28125c2.00391,0 7.89844,0.41016 12.53125,3.28125c0.30078,0.25391 0.72266,0.30469 1.07813,0.13672c0.35156,-0.17187 0.57422,-0.53516 0.56641,-0.92578c-0.01172,-0.39453 -0.25,-0.74609 -0.61328,-0.89844c-2.30859,-1.43359 -4.77734,-2.28906 -7.03125,-2.8125c0.0625,-0.23047 0.11328,-0.42187 0.1875,-0.625c1.14063,0.14063 5.57422,0.73828 8.59375,3.125c0.19531,0.17969 0.875,1.17969 1.5,2.5625c0.625,1.38281 1.28125,3.18359 1.90625,5.25c1.21875,4.03125 2.20313,9.00391 2.25,13.5625c-1.13672,1.83984 -3.26953,3.20703 -5.46875,4.0625c-2,0.77734 -3.86719,1.125 -4.84375,1.21875l-1.6875,-2.28125c0.85938,-0.27734 1.63281,-0.57812 2.3125,-0.875c2.52344,-1.10937 3.875,-2.28125 3.875,-2.28125c0.41406,-0.37109 0.44922,-1.00781 0.07813,-1.42187c-0.37109,-0.41406 -1.00781,-0.44922 -1.42187,-0.07812c0,0 -1.04687,0.95703 -3.34375,1.96875c-0.84375,0.37109 -1.86719,0.73828 -3.03125,1.0625c-0.26953,-0.03125 -0.53906,0.04688 -0.75,0.21875c-1.86328,0.45313 -4.07812,0.75 -6.6875,0.75c-2.62891,0 -4.84766,-0.32422 -6.71875,-0.78125c-0.21094,-0.14062 -0.46875,-0.19922 -0.71875,-0.15625c-1.16797,-0.32422 -2.18359,-0.72266 -3.03125,-1.09375c-2.29687,-1.01172 -3.34375,-1.96875 -3.34375,-1.96875c-0.22656,-0.21094 -0.53906,-0.30078 -0.84375,-0.25c-0.38672,0.05859 -0.70703,0.33594 -0.8125,0.71484c-0.10937,0.375 0.01563,0.78125 0.3125,1.03516c0,0 1.35156,1.17188 3.875,2.28125c0.67969,0.29688 1.45313,0.59766 2.3125,0.875l-1.6875,2.28125c-0.97656,-0.09375 -2.84375,-0.44141 -4.84375,-1.21875c-2.19922,-0.85547 -4.33203,-2.22266 -5.46875,-4.0625c0.04688,-4.55859 1.03125,-9.53125 2.25,-13.5625c0.625,-2.06641 1.28125,-3.86719 1.90625,-5.25c0.625,-1.38281 1.30469,-2.38281 1.5,-2.5625c3.01953,-2.38672 7.45313,-2.98437 8.59375,-3.125zM18.5,21c-2.55078,0 -4.5,2.31641 -4.5,5c0,2.68359 1.94922,5 4.5,5c2.55078,0 4.5,-2.31641 4.5,-5c0,-2.68359 -1.94922,-5 -4.5,-5zM31.5,21c-2.55078,0 -4.5,2.31641 -4.5,5c0,2.68359 1.94922,5 4.5,5c2.55078,0 4.5,-2.31641 4.5,-5c0,-2.68359 -1.94922,-5 -4.5,-5zM18.5,23c1.31641,0 2.5,1.26563 2.5,3c0,1.73438 -1.18359,3 -2.5,3c-1.31641,0 -2.5,-1.26562 -2.5,-3c0,-1.73437 1.18359,-3 2.5,-3zM31.5,23c1.31641,0 2.5,1.26563 2.5,3c0,1.73438 -1.18359,3 -2.5,3c-1.31641,0 -2.5,-1.26562 -2.5,-3c0,-1.73437 1.18359,-3 2.5,-3z"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Discord</h4>
                    <Link
                      href="https://discord.gg/hhRKPYt2gP"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      discord.gg/fixteam
                    </Link>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-bold text-lg mb-4">
                    {t.contact.info.faq.title}
                  </h4>
                  <div className="space-y-4">
                    {t.contact.info.faq.questions.map(
                      (faq: any, index: number) => (
                        <div key={index} className="pb-4">
                          <h5 className="font-bold text-gray-200">{faq.q}</h5>
                          <p className="text-gray-400 mt-1">{faq.a}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer t={t} />
    </div>
  );
}
