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
import img from "@/assets/img.png";
import { geoModule, openJSON } from "@/utils/useGeoLocation";

export default function Home() {

  const [isVisible, setIsVisible] = useState(false);

  // Criando um loading e a tradução completa!
  const [loading, setLoading] = useState(true);
  const [t, setT] : any = useState({});

  // Obtem todos os dados de geo localização e obtem a tradução do país para o idioma escolhido!
  useEffect(() => {

    if (loading === true){

      const timer = setTimeout(async () => {

        const geoData = await geoModule();
        const tradutions = await openJSON(geoData.country || "pt-br");
        
        setT(tradutions);
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
  if (loading){
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="flex flex-col items-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
          />
        </motion.div>
      </div>
    );
  }

  // Mostra o conteudo principal
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Navbar t={t} />
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
              <div className="w-full h-full flex justify-center items-center" style={{
                pointerEvents: "none"
              }}>
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
                    <p className="text-gray-400">{t.about.expertTeam.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{t.about.customSolutions.title}</h4>
                    <p className="text-gray-400">{t.about.customSolutions.description}</p>
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
            {t.process.steps.map((step : any, index : number) => (
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
              <h3 className="text-2xl font-bold mb-6">{t.contact.form.getInTouch}</h3>
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
              <h3 className="text-2xl font-bold mb-6">{t.contact.info.title}</h3>

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

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-bold text-lg mb-4">
                    {t.contact.info.faq.title}
                  </h4>
                  <div className="space-y-4">
                    {t.contact.info.faq.questions.map((faq : any, index : number) => (
                      <div key={index} className="pb-4">
                        <h5 className="font-bold text-gray-200">{faq.q}</h5>
                        <p className="text-gray-400 mt-1">{faq.a}</p>
                      </div>
                    ))}
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