"use client";

import { motion } from "framer-motion";
import { Web3MediaHero } from "@/components/ui/web3media-hero";
import {
  TrendingDown,
  Clock,
  TrendingUp,
  BrainCircuit,
  Bot,
  Workflow,
  Sparkles,
} from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryContext";

const springTransition = {
  type: "spring" as const,
  damping: 40,
  stiffness: 120,
};

export default function Hero() {
  const { dict } = useDictionary();

  const stats = [
    {
      icon: TrendingDown,
      value: dict.hero.stats.costReduction.value,
      label: dict.hero.stats.costReduction.label,
    },
    {
      icon: Clock,
      value: dict.hero.stats.averageROI.value,
      label: dict.hero.stats.averageROI.label,
    },
    {
      icon: TrendingUp,
      value: dict.hero.stats.productivityGain.value,
      label: dict.hero.stats.productivityGain.label,
    },
  ];

  const floatingIcons = [
    {
      icon: <BrainCircuit size={32} className="text-[#0071e3]" />,
      label: dict.hero.floatingLabels.ai,
      position: { x: "18%", y: "25%" },
    },
    {
      icon: <Bot size={32} className="text-[#0071e3]" />,
      label: dict.hero.floatingLabels.agents,
      position: { x: "20%", y: "62%" },
    },
    {
      icon: <Workflow size={32} className="text-[#0071e3]" />,
      label: dict.hero.floatingLabels.automation,
      position: { x: "74%", y: "28%" },
    },
    {
      icon: <Sparkles size={32} className="text-[#0071e3]" />,
      label: dict.hero.floatingLabels.insights,
      position: { x: "72%", y: "65%" },
    },
  ];

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Web3MediaHero
      title={dict.hero.titleLine1}
      highlightedText={dict.hero.titleLine2}
      subtitle={dict.hero.subtitle}
      ctaButton={{
        label: dict.hero.cta,
        onClick: scrollToContact,
      }}
      floatingIcons={floatingIcons}
      glowColor="rgba(0, 113, 227, 0.10)"
      highlightGradient="linear-gradient(90deg, #0071e3 0%, #34a3ff 50%, #0071e3 100%)"
      brands={[
        {
          name: "Google",
          logo: (
            <svg height="24" viewBox="0 0 74 24" fill="none">
              <text x="0" y="18" fill="#86868b" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Google</text>
            </svg>
          ),
        },
        {
          name: "Microsoft",
          logo: (
            <svg height="24" viewBox="0 0 90 24" fill="none">
              <text x="0" y="18" fill="#86868b" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Microsoft</text>
            </svg>
          ),
        },
        {
          name: "OpenAI",
          logo: (
            <svg height="24" viewBox="0 0 70 24" fill="none">
              <text x="0" y="18" fill="#86868b" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">OpenAI</text>
            </svg>
          ),
        },
        {
          name: "Anthropic",
          logo: (
            <svg height="24" viewBox="0 0 90 24" fill="none">
              <text x="0" y="18" fill="#86868b" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Anthropic</text>
            </svg>
          ),
        },
        {
          name: "Slack",
          logo: (
            <svg height="24" viewBox="0 0 56 24" fill="none">
              <text x="0" y="18" fill="#86868b" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Slack</text>
            </svg>
          ),
        },
        {
          name: "Notion",
          logo: (
            <svg height="24" viewBox="0 0 70 24" fill="none">
              <text x="0" y="18" fill="#86868b" fontSize="16" fontWeight="600" fontFamily="Inter, sans-serif">Notion</text>
            </svg>
          ),
        },
      ]}
      trustedByText={dict.hero.trustedBy}
    >
      {/* Custom content using children for more control */}
      <div className="flex flex-col items-center justify-center px-4 w-full">
        {/* Floating Icons — rendered manually for children mode */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute hidden lg:flex flex-col items-center gap-2"
            style={{
              left: item.position.x,
              top: item.position.y,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
              scale: { duration: 0.6, delay: 0.3 + index * 0.1 },
              y: {
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="w-[72px] h-[72px] rounded-full bg-[#0071e3]/[0.06] backdrop-blur-[10px] border border-[#0071e3]/15 flex items-center justify-center shadow-[0_0_40px_rgba(0,113,227,0.12)]">
              {item.icon}
            </div>
            <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wide">
              {item.label}
            </span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center max-w-4xl gap-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#0071e3]/15 bg-[#0071e3]/[0.05]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071e3] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071e3]" />
            </span>
            <span className="text-xs font-medium tracking-widest text-[#0071e3] uppercase">
              {dict.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <h1
            className="font-semibold tracking-tight leading-[1.08] text-[#1d1d1f]"
            style={{
              fontSize: "clamp(36px, 5vw, 76px)",
              letterSpacing: "-0.025em",
            }}
          >
            {dict.hero.titleLine1}
            <br />
            <span
              className="italic"
              style={{
                background:
                  "linear-gradient(90deg, #0071e3 0%, #34a3ff 50%, #0071e3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-serif)",
              }}
            >
              {dict.hero.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            {dict.hero.subtitle}
          </p>

          {/* CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(0,113,227,0.25)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 bg-[#0071e3] text-white font-medium rounded-full px-8 py-4 text-base transition-shadow duration-300 shadow-lg shadow-[#0071e3]/20"
          >
            {dict.hero.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          {/* Stats row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...springTransition,
                  delay: 0.8 + i * 0.12,
                }}
              >
                <stat.icon className="w-5 h-5 text-[#0071e3] mb-1" />
                <span className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-[#86868b] font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-[#86868b]/50"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase">
              {dict.hero.scroll}
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 6L8 11L13 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </Web3MediaHero>
  );
}
