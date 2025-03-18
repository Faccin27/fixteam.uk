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

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Navbar />
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
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 ">
                Automating Your Future
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                We build cutting-edge RPAs and websites that transform how
                businesses operate in the digital world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#services"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center justify-center group"
                >
                  Our Services
                  <ChevronRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium transition-all flex items-center justify-center group"
                >
                  Get in Touch
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
              <div className="w-full h-full flex justify-center items-center">
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
            <span className="text-sm mb-2">Discover More</span>
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
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We specialize in creating custom solutions that automate processes
              and enhance your online presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Robot size={40} />}
              title="RPA Development"
              description="Custom Robotic Process Automation solutions that streamline your business operations and reduce manual workload."
              delay={0.1}
            />
            <ServiceCard
              icon={<Code size={40} />}
              title="Website Development"
              description="Modern, responsive websites built with the latest technologies to showcase your brand and engage your audience."
              delay={0.3}
            />
            <ServiceCard
              icon={<Globe size={40} />}
              title="Web Applications"
              description="Powerful web applications that solve complex business problems and provide seamless user experiences."
              delay={0.5}
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
              <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
              <p className="text-xl text-gray-300 mb-6">
                FixTeam is a team of passionate developers and automation
                experts dedicated to helping businesses leverage technology to
                grow and succeed.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                With years of experience in RPA development and web
                technologies, we create solutions that are not just functional
                but also innovative and future-proof.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Expert Team</h4>
                    <p className="text-gray-400">Skilled professionals</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Custom Solutions</h4>
                    <p className="text-gray-400">Tailored to your needs</p>
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
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={img || "/placeholder.svg"}
                  alt="FixTeam Team"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xs"
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
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We follow a structured approach to deliver high-quality solutions
              that meet your specific requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Discovery",
                description: "We learn about your business and requirements",
              },
              {
                number: "02",
                title: "Planning",
                description: "We create a detailed roadmap for your project",
              },
              {
                number: "03",
                title: "Development",
                description: "Our team builds your custom solution",
              },
              {
                number: "04",
                title: "Deployment",
                description: "We launch and provide ongoing support",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-900 p-8 rounded-lg border border-gray-700 hover:border-purple-700/50 relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:bg-purple-600/20  transition-all duration-500"></div>
                <span className="text-5xl font-bold text-purple-600/30 mb-4 block">
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let&apos;s discuss how our RPA and web development services can
              help you achieve your business goals.
            </p>

            <Link
              href="#contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-lg transition-all inline-flex items-center group"
            >
              Get Started Today
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
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Have a project in mind? Get in touch with us to discuss how we can
              help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-gray-300 mb-8">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>

              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 p-8 rounded-lg border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-6">Our Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-gray-400">contact@fixteam.com</p>
                    <p className="text-gray-400">support@fixteam.com</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-bold text-lg mb-4">
                    Frequently Asked Questions
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        q: "What types of RPAs do you develop?",
                        a: "We develop RPAs for various business processes including data entry, document processing, and workflow automation.",
                      },
                      {
                        q: "How long does a typical project take?",
                        a: "Project timelines vary based on complexity, but most projects are completed within 4-12 weeks.",
                      },
                    ].map((faq, index) => (
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
      <Footer />
    </div>
  );
}
