"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function DestroyManualWork() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative py-12 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Tagline above the component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#1d1d1f]">
            {dict.destroyManualWork.title}{" "}
            <span className="text-[#86868b] line-through decoration-[#0071e3]">
              {dict.destroyManualWork.strikethrough}
            </span>
          </h3>
          <p className="text-[#86868b] mt-2 text-base md:text-lg max-w-xl mx-auto">
            {dict.destroyManualWork.subtitle}
          </p>
        </motion.div>

        {/* Particle text canvas - no background, shrunk container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden"
        >
          <ParticleTextEffect
            text={dict.destroyManualWork.canvasText}
            className="absolute top-0 left-0"
            colors={["0071e3", "2d8cf0", "5a9fd4", "7a8a9a", "6b7280", "4b5563", "374151"]}
            animationForce={90}
            particleDensity={3}
          />
          {/* Fade edges so particles don't look boxed in */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 md:h-16 bg-gradient-to-t from-white to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-white to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
