"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import emailjs from "emailjs-com";

// Definição da interface para as props de tradução
interface ContactFormProps {
  t: {
    contactForm: {
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      subject: {
        label: string;
        placeholder: string;
        options: {
          rpa: string;
          website: string;
          inquiry: string;
          partnership: string;
        };
      };
      message: {
        label: string;
        placeholder: string;
      };
      submit: {
        button: string;
        success: string;
      };
    };
  };
}

// Definição do tipo de dados do formulário
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm({ t }: ContactFormProps) {
  // Estado para gerenciar os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Estados para controle de submissão
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar dados para o webhook do Discord
  const sendToDiscordWebhook = async (formData: FormData) => {
    const discordWebhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

    if (!discordWebhookUrl) {
      console.error("Discord webhook URL is not set");
      return;
    }

    try {
      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          embeds: [{
            title: '📩 Novo Contato Recebido!',
            color: 3447003,
            fields: [
              { name: '👤 Nome', value: formData.name, inline: true },
              { name: '📧 E-mail', value: formData.email, inline: true },
              { name: '📝 Assunto', value: formData.subject, inline: false },
              { name: '💬 Mensagem', value: formData.message, inline: false }
            ],
            image: {
              url: 'https://media.discordapp.net/attachments/1350902210753728677/1352686135171743834/logo.png?ex=67e6d3a2&is=67e58222&hm=67f04eb9c1df9d6c7aa46171191f3df57d15fc3a7728a74ab615dbf00109a016&=&format=webp&quality=lossless&width=968&height=968'
            },
            footer: {
              text: 'FixTeam.uk',
              link: "https://fixteam.uk",
              icon_url: 'https://media.discordapp.net/attachments/1354483563646681161/1354886163936186368/tecnop.png?ex=67e6eb92&is=67e59a12&hm=0f52e7a0776feb766f69a5cefcaa624b792811d97a6429da76502751d6f1add2&=&format=webp&quality=lossless&width=399&height=350' 
            }
          }]
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem para o Discord');
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem para o Discord:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;

    const templateParams = {
      from_name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      await sendToDiscordWebhook(formData);

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Falha no envio...", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 text-gray-100 focus:outline-none focus:border-blue-500 transition-all placeholder-transparent"
            placeholder={t.contactForm.name.placeholder}
          />
          <label
            htmlFor="name"
            className="absolute left-4 -top-5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-blue-500"
          >
            {t.contactForm.name.label}
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 text-gray-100 focus:outline-none focus:border-blue-500 transition-all placeholder-transparent"
            placeholder={t.contactForm.email.placeholder}
          />
          <label
            htmlFor="email"
            className="absolute left-4 -top-5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-blue-500"
          >
            {t.contactForm.email.label}
          </label>
        </div>
      </div>

      <div className="relative">
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-600 text-gray-100 focus:outline-none focus:border-blue-500 transition-all appearance-none"
        >
          <option value="" disabled className="bg-gray-800">{t.contactForm.subject.placeholder}</option>
          <option value="RPA Development" className="bg-gray-800">{t.contactForm.subject.options.rpa}</option>
          <option value="Website Development" className="bg-gray-800">{t.contactForm.subject.options.website}</option>
          <option value="General Inquiry" className="bg-gray-800">{t.contactForm.subject.options.inquiry}</option>
          <option value="Partnership" className="bg-gray-800">{t.contactForm.subject.options.partnership}</option>
        </select>
        <label
          htmlFor="subject"
          className="absolute left-4 -top-5 text-sm text-gray-400"
        >
          {t.contactForm.subject.label}
        </label>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>

      <div className="relative">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-transparent border-2 border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 transition-all resize-none"
          placeholder={t.contactForm.message.placeholder}
        ></textarea>
        <label
          htmlFor="message"
          className="absolute left-4 -top-3 bg-gray-900 px-2 text-sm text-gray-400"
        >
          {t.contactForm.message.label}
        </label>
      </div>

      <div>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-600/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg"
          >
            {t.contactForm.submit.success}
          </motion.div>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-all flex items-center justify-center ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                {t.contactForm.submit.button}
                <Send size={18} className="ml-2" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}