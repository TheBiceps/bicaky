"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function Comparison() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="comparison" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-3">
          {dict.comparison.title}
        </h2>
        <p className="text-center text-[#86868b] mb-14 text-base md:text-lg max-w-2xl mx-auto">
          {dict.comparison.subtitle}
        </p>

        {/* Columns */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Dakoty column */}
          <div className="relative rounded-2xl bg-white border-2 border-[#0071e3]/20 p-8 shadow-[0_0_0_1px_rgba(0,113,227,0.08),0_8px_40px_-12px_rgba(0,113,227,0.12)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#0071e3]" />
              <h3 className="text-lg font-semibold text-[#1d1d1f]">
                {dict.comparison.withDakoty}
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {dict.comparison.dakotyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0071e3]/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#0071e3]" />
                  </div>
                  <span className="text-[15px] text-[#1d1d1f] leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Without AI column */}
          <div className="relative rounded-2xl bg-[#f5f5f7] border border-black/[0.05] p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#86868b]/40" />
              <h3 className="text-lg font-semibold text-[#86868b]">
                {dict.comparison.withoutAI}
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {dict.comparison.withoutAIItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: 20 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black/[0.04] flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-[#86868b]/60" />
                  </div>
                  <span className="text-[15px] text-[#86868b] leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
