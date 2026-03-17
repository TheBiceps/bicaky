"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function Footer() {
  const { dict, locale } = useDictionary();

  const navLinks = [
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.howItWorks, href: "#how-it-works" },
    { label: dict.nav.results, href: "#results" },
    { label: dict.nav.contact, href: "#contact-section" },
  ];

  return (
    <footer className="border-t border-black/[0.05] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#0071e3] flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-[#1d1d1f] font-semibold text-base tracking-tight">
              AKOTY
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-[#86868b] hover:text-[#1d1d1f] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Email */}
          <a
            href="mailto:hello@dakotystudio.com"
            className="text-sm text-[#86868b] hover:text-[#0071e3] transition-colors"
          >
            hello@dakotystudio.com
          </a>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-black/[0.05] mt-8 pt-8">
          <p className="text-xs text-[#86868b] text-center">
            {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
