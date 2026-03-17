"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Server, Lock, FileCheck } from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryContext";
import DisplayCards from "@/components/ui/display-cards";

const icons = [Shield, Server, Lock, FileCheck];

export default function DataGovernance() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const displayCards = dict.dataGovernance.cards.map((card, index) => {
    const Icon = icons[index];

    const stackClasses = [
      // Card 0 — furthest back
      "[grid-area:stack] hover:-translate-y-12 opacity-45 hover:opacity-100",
      // Card 1
      "[grid-area:stack] translate-x-16 translate-y-16 hover:-translate-y-2 opacity-55 hover:opacity-100",
      // Card 2
      "[grid-area:stack] translate-x-32 translate-y-32 hover:translate-y-18 opacity-70 hover:opacity-100",
      // Card 3 — front, fully visible
      "[grid-area:stack] translate-x-48 translate-y-48 hover:translate-y-36",
    ];

    return {
      className: stackClasses[index],
      icon: <Icon className="size-5 text-white" />,
      title: card.title,
      description: card.description,
      date: "",
      iconClassName: "text-[#0071e3]",
      titleClassName: "text-[#1d1d1f]",
    };
  });

  return (
    <section className="bg-[#f5f5f7] py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
            {dict.dataGovernance.title}
          </h2>
          <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            {dict.dataGovernance.subtitle}
          </p>
        </motion.div>

        {/* Display Cards */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center min-h-[550px] py-12"
        >
          <DisplayCards cards={displayCards} />
        </motion.div>
      </div>
    </section>
  );
}
