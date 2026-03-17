"use client";

import { motion } from "framer-motion";
import { Mail, Globe, MapPin, Calendar } from "lucide-react";
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
      staggerChildren: 0.1,
    },
  },
};

const fieldStyles =
  "w-full px-4 py-3 rounded-xl bg-[#f5f5f7] border border-black/[0.05] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-0 transition-all";

const contactIcons = [Mail, Globe, MapPin, Calendar] as const;
const contactHrefs = [
  "mailto:hello@dakotystudio.com",
  "https://www.dakotystudio.com",
  null,
  "#book-a-call",
];

export default function ContactPage() {
  const { dict } = useDictionary();
  const cp = dict.contactPage;

  const contactInfo = [
    { icon: contactIcons[0], ...cp.info.email, href: contactHrefs[0] },
    { icon: contactIcons[1], ...cp.info.website, href: contactHrefs[1] },
    { icon: contactIcons[2], ...cp.info.location, href: contactHrefs[2] },
    { icon: contactIcons[3], ...cp.info.schedule, href: contactHrefs[3] },
  ];

  return (
    <div className="min-h-screen pt-32 px-6 max-w-6xl mx-auto pb-24">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 50, stiffness: 125 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="gradient-text">{cp.title}</span>
        </h1>
        <p className="text-lg md:text-xl text-[#86868b] mt-5 max-w-2xl mx-auto leading-relaxed">
          {cp.subtitle}
        </p>
      </motion.div>

      {/* Two-column layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-5 gap-12"
      >
        {/* Left column - Contact info cards */}
        <div className="md:col-span-2 space-y-4">
          {contactInfo.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="p-5 rounded-xl bg-white border border-black/[0.06] flex items-start gap-4 hover:border-[#0071e3]/20 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0071e3]/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-[#0071e3]" />
              </div>
              <div>
                <p className="text-[#86868b] text-xs uppercase tracking-wide mb-0.5">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[#1d1d1f] text-sm font-medium hover:text-[#0071e3] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[#1d1d1f] text-sm font-medium">
                    {item.value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right column - Contact form */}
        <motion.form
          variants={fadeUp}
          className="md:col-span-3 space-y-5 p-8 rounded-2xl bg-white border border-black/[0.06] shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Row: Full Name + Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-[#1d1d1f]/70 mb-1.5">
                {cp.form.fullName}
              </label>
              <input
                type="text"
                placeholder={cp.form.fullNamePlaceholder}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className="block text-sm text-[#1d1d1f]/70 mb-1.5">
                {cp.form.email}
              </label>
              <input
                type="email"
                placeholder={cp.form.emailPlaceholder}
                className={fieldStyles}
              />
            </div>
          </div>

          {/* Row: Phone + Company Name */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-[#1d1d1f]/70 mb-1.5">
                {cp.form.phone}{" "}
                <span className="text-[#86868b]">{cp.form.phoneOptional}</span>
              </label>
              <input
                type="tel"
                placeholder={cp.form.phonePlaceholder}
                className={fieldStyles}
              />
            </div>
            <div>
              <label className="block text-sm text-[#1d1d1f]/70 mb-1.5">
                {cp.form.company}{" "}
                <span className="text-[#86868b]">
                  {cp.form.companyOptional}
                </span>
              </label>
              <input
                type="text"
                placeholder={cp.form.companyPlaceholder}
                className={fieldStyles}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-[#1d1d1f]/70 mb-1.5">
              {cp.form.subject}
            </label>
            <select className={`${fieldStyles} appearance-none`}>
              <option value="">{cp.form.subjectDefault}</option>
              {cp.form.subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm text-[#1d1d1f]/70 mb-1.5">
              {cp.form.message}
            </label>
            <textarea
              rows={5}
              placeholder={cp.form.messagePlaceholder}
              className={`${fieldStyles} resize-none`}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-full font-medium bg-[#0071e3] text-white hover:bg-[#0058b0] transition-all cursor-pointer"
          >
            {cp.form.submit}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
