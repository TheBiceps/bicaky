"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/i18n/DictionaryContext";

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <div
        className={cn(
          "bg-[#f5f5f7] border border-black/[0.05] rounded-2xl overflow-hidden transition-colors duration-300",
          isOpen && "border-[#0071e3]/20"
        )}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
        >
          <span
            className={cn(
              "text-base font-medium pr-4 transition-colors duration-300",
              isOpen ? "text-[#0071e3]" : "text-[#1d1d1f]"
            )}
          >
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
              isOpen
                ? "bg-[#0071e3] text-white"
                : "bg-black/[0.05] text-[#86868b]"
            )}
          >
            <Plus className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0">
                <div className="border-t border-black/[0.05] pt-4">
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const { dict } = useDictionary();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-3">
          {dict.faq.title}
        </h2>
        <p className="text-center text-[#86868b] mb-14 text-base md:text-lg max-w-2xl mx-auto">
          {dict.faq.subtitle}
        </p>

        {/* FAQ list */}
        <div ref={sectionRef} className="flex flex-col gap-3">
          {isInView &&
            dict.faq.items.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mt-14 text-center"
        >
          <p className="text-[#86868b] text-sm mb-3">{dict.faq.stillHaveQuestions}</p>
          <a
            href="#contact-section"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0071e3] hover:underline underline-offset-4 transition-all duration-300"
          >
            {dict.faq.getInTouch}
            <span>&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
