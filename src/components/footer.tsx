import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ChevronRight } from "lucide-react";
import isac from "@/assets/isaac.jpg";
import willian from "@/assets/willian.jpg";
import faccin from "@/assets/faccin.jpg";

interface props {
  t: any;
}

export default function Footer({ t } : props) {

  interface socialMedia {
    name: string;
    image: StaticImageData;
    url: string;
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <Link href="/">
              <img 
                src="/logo.png" 
                alt="Logo da empresa"
                style={{
                  width: 150,
                  height: 30,
                }}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.services.title}</h3>
            <ul className="space-y-2">
              {t.footer.services.items.map((service : any, index : number) => (
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
            <h3 className="text-lg font-bold mb-4">{t.footer.company.title}</h3>
            <ul className="space-y-2">
              {t.footer.company.items.map(
                (item : any, index : number) => (
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
              {t.footer.legal.items.map((item : any, index : number) => (
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
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-500 hover:text-blue-400 text-sm transition-colors"
            >
              {t.footer.madeWith}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
