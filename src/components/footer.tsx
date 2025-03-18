import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ChevronRight } from "lucide-react";
import isac from "@/assets/isaac.jpg";
import willian from "@/assets/willian.jpg";
import faccin from "@/assets/faccin.jpg";

export default function Footer() {
  interface socialMedia {
    name: string;
    image: StaticImageData;
    url: string;
  }

  const socialMedia: socialMedia[] = [
    {
      name: "Willian",
      image: willian,
      url: "https://www.linkedin.com/in/williangiovaninideitosi/",
    },
    {
      name: "Faccin",
      image: faccin,
      url: "https://www.linkedin.com/in/guilherme-faccin/",
    },
    {
      name: "Isaac",
      image: isac,
      url: "https://www.linkedin.com/in/isack-foster/",
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-white flex items-center mb-4"
            >
              <span className="text-blue-500">Fix</span>Team
            </Link>
            <p className="text-gray-400 mb-4">
              Transforming businesses through automation and web development.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  className=" bg-gray-800 hover:bg-blue-600/30 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={social.image}
                    alt={social.name}
                    width={72}
                    height={72}
                    className="rounded-full object-cover"
                  />
                </Link>
                
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "RPA Development",
                "Website Development",
                "Web Applications",
                "Process Automation",
                "Custom Solutions",
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Our Team", "Careers", "Blog", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                    >
                      <ChevronRight size={16} className="mr-2" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "GDPR Compliance",
                "Sitemap",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FixTeam. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-400 text-sm transition-colors"
            >
              Made with ❤️ by FixTeam
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
