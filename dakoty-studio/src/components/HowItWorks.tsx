"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  Wrench,
  BarChart3,
  Search,
  LineChart,
  Workflow,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useDictionary } from "@/i18n/DictionaryContext";
import type { LucideIcon } from "lucide-react";

interface VisualItem {
  icon: LucideIcon;
  label: string;
  status: string;
}

interface Step {
  phase: string;
  title: string;
  duration: string;
  desc: string;
  icon: LucideIcon;
  deliverables: readonly string[];
  visual: {
    title: string;
    items: VisualItem[];
  };
}

const stepIcons: LucideIcon[] = [ClipboardCheck, Wrench, BarChart3];

const visualIcons: LucideIcon[][] = [
  [Search, MessageSquare, LineChart, Workflow],
  [Workflow, ShieldCheck, Wrench, MessageSquare],
  [LineChart, BarChart3, Wrench, ShieldCheck],
];

const visualStatuses: string[][] = [
  ["completed", "completed", "in-progress", "pending"],
  ["completed", "completed", "in-progress", "pending"],
  ["completed", "completed", "in-progress", "active"],
];

function StatusIcon({ status }: { status: string }) {
  if (status === "completed") {
    return (
      <div className="w-6 h-6 rounded-full bg-[#0071e3] flex items-center justify-center flex-shrink-0">
        <svg width="12" height="9" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (status === "in-progress") {
    return <div className="w-6 h-6 rounded-full border-2 border-amber-400 border-t-transparent animate-spin flex-shrink-0" />;
  }
  if (status === "active") {
    return <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0" />;
  }
  return <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex-shrink-0" />;
}

function StepVisualCard({ step }: { step: Step }) {
  return (
    <div className="w-full max-w-md bg-[#f5f5f7] rounded-3xl border border-black/[0.06] shadow-xl overflow-hidden">
      {/* macOS-style header bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-black/[0.06] bg-white/60">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-2 text-xs font-medium text-[#86868b]">{step.visual.title}</span>
      </div>

      {/* Task items */}
      <div className="p-5 space-y-3">
        {step.visual.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.08 }}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-black/[0.04] hover:shadow-sm transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item.status === "completed"
                  ? "bg-[#0071e3]/10"
                  : item.status === "in-progress"
                  ? "bg-amber-50"
                  : item.status === "active"
                  ? "bg-green-50"
                  : "bg-gray-50"
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${
                  item.status === "completed"
                    ? "text-[#0071e3]"
                    : item.status === "in-progress"
                    ? "text-amber-500"
                    : item.status === "active"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-[#1d1d1f] flex-1">{item.label}</span>
            <StatusIcon status={item.status} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3.5 border-t border-black/[0.06] bg-white/40 flex items-center justify-between">
        <span className="text-xs text-[#86868b]">{step.phase}</span>
        <span className="text-xs font-semibold text-[#0071e3]">{step.duration}</span>
      </div>
    </div>
  );
}

function DesktopStep({
  step,
  index,
  onActive,
}: {
  step: Step;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Shrink the observation zone: ignore the top 10% and bottom 70% of the viewport.
  // This creates a narrow trigger band (~20% tall) near the top of the screen,
  // aligned with the sticky panel. The right-side card only changes when the
  // step's top edge scrolls into this band — not when it first appears at the bottom.
  const isInView = useInView(ref, { margin: "-10% 0px -70% 0px" });

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  return (
    <div ref={ref} className="relative pl-16 min-h-[380px]">
      {/* Dot on the progress line */}
      <div
        className={`absolute left-[14px] top-1 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-colors duration-300 ${
          isInView ? "bg-[#0071e3]" : "bg-gray-300"
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      <div className="px-1">
        <span
          className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold tracking-wider mb-4 transition-colors duration-300 ${
            isInView ? "bg-[#0071e3]" : "bg-gray-400"
          }`}
        >
          {step.phase.toUpperCase()}
        </span>
        <h4
          className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
            isInView ? "text-[#1d1d1f]" : "text-[#86868b]"
          }`}
        >
          {step.title}
        </h4>
        <p className="text-[#86868b] text-[15px] leading-relaxed mb-5 max-w-md">{step.desc}</p>

        {/* Deliverables list */}
        <div className="space-y-2.5 mb-5">
          {step.deliverables.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2
                className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                  isInView ? "text-[#0071e3]" : "text-gray-300"
                }`}
              />
              <span className="text-sm text-[#1d1d1f]/80 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <step.icon
            className={`w-4 h-4 transition-colors duration-300 ${
              isInView ? "text-[#0071e3]" : "text-gray-400"
            }`}
          />
          <span
            className={`text-sm font-semibold transition-colors duration-300 ${
              isInView ? "text-[#0071e3]" : "text-gray-400"
            }`}
          >
            {step.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = useMemo(
    () =>
      dict.howItWorks.steps.map((s, i) => ({
        phase: s.phase,
        title: s.title,
        duration: s.duration,
        desc: s.desc,
        icon: stepIcons[i],
        deliverables: s.deliverables,
        visual: {
          title: s.visualTitle,
          items: s.visualItems.map((label, j) => ({
            icon: visualIcons[i][j],
            label,
            status: visualStatuses[i][j],
          })),
        },
      })),
    [dict]
  );

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0071e3]/20 bg-[#0071e3]/5 text-xs uppercase tracking-widest text-[#0071e3] font-medium">
            {dict.howItWorks.badge}
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-3"
        >
          {dict.howItWorks.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-[#86868b] mb-16 text-base md:text-lg max-w-2xl mx-auto"
        >
          {dict.howItWorks.subtitle}
        </motion.p>

        {/* Desktop: Scroll-linked layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-16">
            {/* Left: Steps with progress line */}
            <div className="relative">
              {/* Track line */}
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-black/[0.06]" />
              {/* Filled line based on active step */}
              <div
                className="absolute left-6 top-0 w-[2px] bg-[#0071e3] transition-all duration-500 ease-out"
                style={{
                  height: `${((activeStep + 1) / steps.length) * 100}%`,
                }}
              />

              <div className="space-y-16 py-8">
                {steps.map((step, i) => (
                  <DesktopStep
                    key={step.phase}
                    step={step}
                    index={i}
                    onActive={setActiveStep}
                  />
                ))}
              </div>
            </div>

            {/* Right: Sticky visual panel */}
            <div className="relative">
              <div className="sticky top-32 flex items-start justify-center pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <StepVisualCard step={steps[activeStep]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Stacked cards */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="relative rounded-3xl border border-black/[0.05] bg-[#f5f5f7] p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-[#0071e3] text-white text-xs font-bold tracking-wider">
                {step.phase.toUpperCase()}
              </div>

              <div className="flex items-center gap-4 mb-5 mt-2">
                <div className="w-14 h-14 rounded-2xl bg-[#0071e3]/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-[#0071e3]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#1d1d1f]">{step.title}</h3>
              </div>

              <p className="text-[#86868b] text-[15px] leading-relaxed mb-5">{step.desc}</p>

              {/* Deliverables */}
              <div className="space-y-2.5 mb-5">
                {step.deliverables.map((item, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#0071e3] flex-shrink-0" />
                    <span className="text-sm text-[#1d1d1f]/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Mini visual items */}
              <div className="space-y-2 mb-4">
                {step.visual.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-black/[0.04]"
                  >
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                        item.status === "completed"
                          ? "bg-[#0071e3]/10"
                          : item.status === "in-progress"
                          ? "bg-amber-50"
                          : item.status === "active"
                          ? "bg-green-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <item.icon
                        className={`w-3.5 h-3.5 ${
                          item.status === "completed"
                            ? "text-[#0071e3]"
                            : item.status === "in-progress"
                            ? "text-amber-500"
                            : item.status === "active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#1d1d1f]">{item.label}</span>
                    <div className="ml-auto">
                      <StatusIcon status={item.status} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <span className="text-sm font-semibold text-[#0071e3]">{step.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
