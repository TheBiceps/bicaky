"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 50, stiffness: 125 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fieldStyles =
  "w-full px-4 py-3.5 rounded-xl bg-[#f5f5f7] border border-black/[0.05] text-[#1d1d1f] placeholder:text-[#86868b]/60 focus:outline-none focus:border-[#0071e3] focus:ring-0 transition-all text-[15px]";

export default function ContactSection() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="contact-section" className="py-24 px-6 bg-white">
      <motion.div
        ref={sectionRef}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] text-center leading-tight"
        >
          {dict.contact.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-center text-lg text-[#86868b] mt-4 mb-16 max-w-xl mx-auto"
        >
          {dict.contact.subtitle}
        </motion.p>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left column - Info */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#0071e3]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">
                {dict.contact.emailUs}
              </h3>
            </div>

            <p className="text-[#86868b] mb-6 leading-relaxed">
              {dict.contact.emailDescription}
            </p>

            <a
              href="mailto:hello@dakotystudio.com"
              className="text-[#0071e3] hover:underline underline-offset-4 transition-colors text-lg font-medium"
            >
              hello@dakotystudio.com
            </a>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.form
            variants={fadeUp}
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
                {dict.contact.form.name}
              </label>
              <input
                type="text"
                placeholder={dict.contact.form.namePlaceholder}
                className={fieldStyles}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
                {dict.contact.form.email}
              </label>
              <input
                type="email"
                placeholder={dict.contact.form.emailPlaceholder}
                className={fieldStyles}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
                {dict.contact.form.company}
              </label>
              <input
                type="text"
                placeholder={dict.contact.form.companyPlaceholder}
                className={fieldStyles}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#1d1d1f] mb-1.5">
                {dict.contact.form.message}
              </label>
              <textarea
                rows={4}
                placeholder={dict.contact.form.messagePlaceholder}
                className={`${fieldStyles} resize-none`}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-full font-semibold bg-[#0071e3] text-white hover:bg-[#0077ED] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {dict.contact.form.submit}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
