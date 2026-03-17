"use client";

import { useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Headset,
  TrendingUp,
  FileText,
  BookOpen,
  Mic,
  Users,
  Calculator,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryContext";

/* ------------------------------------------------------------------ */
/*  Icons array (no translation needed)                                */
/* ------------------------------------------------------------------ */

const icons = [Headset, TrendingUp, FileText, BookOpen, Mic, Users, Calculator, PenTool];

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Services() {
  const { dict } = useDictionary();
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-80px" });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
      e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
    },
    []
  );

  return (
    <section
      id="services"
      className="relative py-28 px-6 bg-white overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,113,227,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0071e3]/15 bg-[#0071e3]/[0.06] text-xs font-semibold tracking-widest text-[#0071e3] uppercase">
            {dict.services.badge}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight"
        >
          {dict.services.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center text-[#86868b] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {dict.services.subtitle}
        </motion.p>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {dict.services.items.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                onMouseMove={handleMouseMove}
                className={cn(
                  "card-spotlight group relative flex flex-col rounded-2xl p-5 sm:p-6",
                  "bg-[#f5f5f7] border border-transparent",
                  "hover:border-[#0071e3]/20 hover:shadow-[0_2px_20px_rgba(0,113,227,0.08)]",
                  "transition-all duration-300 cursor-default"
                )}
              >
                {/* Icon */}
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-black/[0.04] group-hover:border-[#0071e3]/15 group-hover:shadow-md transition-all duration-300">
                  <Icon className="h-5 w-5 text-[#86868b] group-hover:text-[#0071e3] transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-[15px] sm:text-base font-semibold text-[#1d1d1f] mb-1.5">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-sm text-[#86868b] leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Metric pill */}
                <div className="mt-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium",
                      "bg-[#0071e3]/[0.08] text-[#0071e3]",
                      "group-hover:bg-[#0071e3]/[0.12] transition-colors duration-300"
                    )}
                  >
                    {item.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
