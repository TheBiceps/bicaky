"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryContext";

export default function Pricing() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
            {dict.pricing.title}
          </h2>
          <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
            {dict.pricing.subtitle}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          {dict.pricing.tiers.map((tier, index) => {
            const featured = index === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className={cn(
                  "relative rounded-2xl p-8 transition-shadow duration-300",
                  featured
                    ? "gradient-border bg-white shadow-xl md:scale-105 md:py-10 z-10"
                    : "bg-white border border-[#e5e5e5]/80 shadow-sm hover:shadow-lg"
                )}
              >
                {/* Featured badge */}
                {featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-block bg-[#0071e3] text-white text-xs font-medium px-4 py-1 rounded-full tracking-wide uppercase">
                      {dict.pricing.mostPopular}
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">
                  {tier.name}
                </h3>

                {/* Duration */}
                <p className="text-sm text-[#86868b] mb-5">{tier.duration}</p>

                {/* Price */}
                <p className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight mb-8">
                  {tier.price}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-4.5 h-4.5 text-[#0071e3] mt-0.5 shrink-0" />
                      <span className="text-[15px] text-[#1d1d1f]/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    "w-full py-3 rounded-xl text-[15px] font-medium transition-colors duration-200 cursor-pointer",
                    featured
                      ? "bg-[#0071e3] text-white hover:bg-[#0077ed]"
                      : "border-2 border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3]/5"
                  )}
                >
                  {tier.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
