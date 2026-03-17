"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingDown, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryContext";

const benefitIcons = [TrendingDown, Users, Clock];

function AnimatedStat({
  stat,
  isInView,
  index,
}: {
  stat: string;
  isInView: boolean;
  index: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Parse the stat to find numeric portion
    // "40-60%" => animate 0->40, then show "-60%"
    // "2x" => animate 0->2, then show "x"
    // "3" => animate 0->3 (title handles the rest)

    let target: number;
    let prefix = "";
    let suffix = "";

    if (stat === "40-60%") {
      target = 60;
      prefix = "40-";
      suffix = "%";
    } else if (stat === "2x") {
      target = 2;
      suffix = "x";
    } else {
      target = parseInt(stat, 10);
    }

    const duration = 1600;
    const delay = index * 200;
    const startTime = Date.now() + delay;

    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        setDisplayed("0" + suffix);
        requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (progress < 1) {
        setDisplayed(
          (current > 0 && prefix ? prefix : "") + current + suffix
        );
        requestAnimationFrame(animate);
      } else {
        setDisplayed(prefix + target + suffix);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, stat, index]);

  return (
    <span className="gradient-text-blue text-5xl md:text-6xl font-bold tracking-tight">
      {displayed || "0"}
    </span>
  );
}

export default function Benefits() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const benefits = dict.benefits.items.map((item, i) => ({
    icon: benefitIcons[i],
    stat: item.stat,
    title: item.title,
    description: item.description,
  }));

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
    <section id="benefits" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-4 tracking-tight">
            {dict.benefits.title}
          </h2>
          <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto">
            {dict.benefits.subtitle}
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 60px rgba(0,113,227,0.1)",
              }}
              onMouseMove={handleMouseMove}
              className={cn(
                "card-spotlight group relative overflow-hidden rounded-2xl p-8 md:p-10",
                "bg-white border border-[#e5e5e7]"
              )}
            >
              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0071e3] to-[#40a9ff] opacity-60 group-hover:opacity-100 transition-opacity duration-400" />

              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e8f4fd]">
                <benefit.icon className="w-5 h-5 text-[#0071e3]" />
              </div>

              {/* Animated stat */}
              <div className="mb-3">
                <AnimatedStat
                  stat={benefit.stat}
                  isInView={isInView}
                  index={index}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] text-[#86868b] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
