"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryContext";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { dict, locale } = useDictionary();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.howItWorks, href: "#how-it-works" },
    { label: dict.nav.results, href: "#results" },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  const pathWithoutLocale = pathname.replace(/^\/(en|sk)/, "") || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const handler = () => setLangOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl rounded-2xl px-6 transition-all duration-500 ${
            scrolled
              ? "glass-strong py-2 shadow-sm"
              : "bg-transparent py-3"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center group">
              <Image
                src="/dakoty-full-text.png"
                alt="Dakoty"
                width={120}
                height={32}
                className="transition-opacity duration-300 group-hover:opacity-70 invert"
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="relative px-4 py-1.5 text-sm text-[#1d1d1f]/70 transition-colors duration-300 hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-1.5 text-sm text-[#1d1d1f]/70 transition-colors duration-300 hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Right side: Language switcher + CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLangOpen(!langOpen);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[#1d1d1f]/70 hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-all duration-200 cursor-pointer"
                >
                  <span className="text-base">{localeFlags[locale]}</span>
                  <span className="text-xs font-medium uppercase">{locale}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-xl border border-black/[0.08] shadow-lg overflow-hidden z-50"
                    >
                      {locales.map((l) => (
                        <Link
                          key={l}
                          href={`/${l}${pathWithoutLocale}`}
                          onClick={() => setLangOpen(false)}
                          className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                            l === locale
                              ? "bg-[#0071e3]/5 text-[#0071e3] font-medium"
                              : "text-[#1d1d1f] hover:bg-black/[0.03]"
                          }`}
                        >
                          <span className="text-base">{localeFlags[l]}</span>
                          <span>{localeNames[l]}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book a Call button */}
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#0077ED] active:scale-95"
              >
                {dict.nav.bookACall}
              </Link>
            </div>

            {/* Mobile: Language flag + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <Link
                href={`/${locale === "en" ? "sk" : "en"}${pathWithoutLocale}`}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm hover:bg-black/[0.04] transition-all"
              >
                <span className="text-base">{localeFlags[locale === "en" ? "sk" as Locale : "en" as Locale]}</span>
                <span className="text-xs font-medium uppercase text-[#1d1d1f]/70">{locale === "en" ? "SK" : "EN"}</span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-[#1d1d1f] transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                {link.href.startsWith("#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl font-medium text-[#1d1d1f]/60 transition-colors duration-300 hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-medium text-[#1d1d1f]/60 transition-colors duration-300 hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#0077ED] active:scale-95"
              >
                {dict.nav.bookACall}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
