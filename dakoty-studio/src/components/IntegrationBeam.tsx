"use client";

import React, { forwardRef, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { useDictionary } from "@/i18n/DictionaryContext";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 md:size-14 items-center justify-center rounded-full border-2 border-[#e5e5e7] bg-white p-2.5 md:p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-[#0071e3]/30 hover:shadow-[0_0_30px_-8px_rgba(0,113,227,0.2)]",
        className
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

// Horizontal flowing tool tags
function FlowingToolTags() {
  const tools = [
    { name: "Google Drive", icon: Icons.googleDriveSmall },
    { name: "Notion", icon: Icons.notionSmall },
    { name: "WhatsApp", icon: Icons.whatsappSmall },
    { name: "Google Docs", icon: Icons.googleDocsSmall },
    { name: "Zapier", icon: Icons.zapierSmall },
    { name: "Messenger", icon: Icons.messengerSmall },
    { name: "Slack", icon: Icons.slackSmall },
    { name: "HubSpot", icon: Icons.hubspotSmall },
    { name: "Salesforce", icon: Icons.salesforceSmall },
  ];

  // Double the array for seamless loop
  const doubled = [...tools, ...tools];

  return (
    <div className="relative overflow-hidden mt-8">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.06] bg-[#f5f5f7] whitespace-nowrap"
          >
            <tool.icon />
            <span className="text-sm font-medium text-[#1d1d1f]/70">
              {tool.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function IntegrationBeam() {
  const { dict } = useDictionary();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  // Force re-render beams after mount for correct positioning
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0071e3]/20 bg-[#0071e3]/5 text-xs uppercase tracking-widest text-[#0071e3] font-medium mb-4">
            {dict.integrationBeam.badge}
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-3"
        >
          {dict.integrationBeam.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-[#86868b] mb-12 text-base md:text-lg max-w-2xl mx-auto"
        >
          {dict.integrationBeam.subtitle}
        </motion.p>

        {/* Beam visualization - no background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex w-full items-center justify-center overflow-visible p-6 md:p-10"
          ref={containerRef}
          style={{ minHeight: 300 }}
        >
          <div className="flex size-full flex-col max-w-lg items-stretch justify-between gap-8 md:gap-12" style={{ minHeight: 240 }}>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div1Ref}>
                <Icons.googleDrive />
              </Circle>
              <Circle ref={div5Ref}>
                <Icons.googleDocs />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div2Ref}>
                <Icons.notion />
              </Circle>
              <Circle ref={div4Ref} className="size-16 md:size-20 border-[#0071e3]/30 shadow-[0_0_30px_-8px_rgba(0,113,227,0.3)]">
                <Icons.chatGPT />
              </Circle>
              <Circle ref={div6Ref}>
                <Icons.zapier />
              </Circle>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div3Ref}>
                <Icons.whatsapp />
              </Circle>
              <Circle ref={div7Ref}>
                <Icons.messenger />
              </Circle>
            </div>
          </div>

          {/* Beams flowing in */}
          {mounted && (
            <>
              <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={div1Ref as React.RefObject<HTMLElement>}
                toRef={div4Ref as React.RefObject<HTMLElement>}
                curvature={-75}
                endYOffset={-10}
                gradientStartColor="#0071e3"
                gradientStopColor="#34a3ff"
                pathColor="#0071e3"
                pathOpacity={0.12}
              />
              <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={div2Ref as React.RefObject<HTMLElement>}
                toRef={div4Ref as React.RefObject<HTMLElement>}
                gradientStartColor="#0071e3"
                gradientStopColor="#34a3ff"
                pathColor="#0071e3"
                pathOpacity={0.12}
              />
              <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={div3Ref as React.RefObject<HTMLElement>}
                toRef={div4Ref as React.RefObject<HTMLElement>}
                curvature={75}
                endYOffset={10}
                gradientStartColor="#0071e3"
                gradientStopColor="#34a3ff"
                pathColor="#0071e3"
                pathOpacity={0.12}
              />
              {/* Beams flowing out */}
              <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={div5Ref as React.RefObject<HTMLElement>}
                toRef={div4Ref as React.RefObject<HTMLElement>}
                curvature={-75}
                endYOffset={-10}
                reverse
                gradientStartColor="#34a3ff"
                gradientStopColor="#0071e3"
                pathColor="#0071e3"
                pathOpacity={0.12}
              />
              <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={div6Ref as React.RefObject<HTMLElement>}
                toRef={div4Ref as React.RefObject<HTMLElement>}
                reverse
                gradientStartColor="#34a3ff"
                gradientStopColor="#0071e3"
                pathColor="#0071e3"
                pathOpacity={0.12}
              />
              <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={div7Ref as React.RefObject<HTMLElement>}
                toRef={div4Ref as React.RefObject<HTMLElement>}
                curvature={75}
                endYOffset={10}
                reverse
                gradientStartColor="#34a3ff"
                gradientStopColor="#0071e3"
                pathColor="#0071e3"
                pathOpacity={0.12}
              />
            </>
          )}
        </motion.div>

        {/* Flowing tool tags with icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FlowingToolTags />
          <div className="flex justify-center mt-4">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium text-[#0071e3] bg-[#0071e3]/5 border border-[#0071e3]/10">
              {dict.integrationBeam.anyTool}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const Icons = {
  chatGPT: () => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#1d1d1f" />
    </svg>
  ),
  notion: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z"
        fill="#ffffff"
      />
      <path
        d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z"
        fill="#000000"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  ),
  googleDrive: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
    </svg>
  ),
  whatsapp: () => (
    <svg width="24" height="24" viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wa-b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
      </defs>
      <path d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z" fill="#ffffff" />
      <path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z" fill="url(#wa-b)" />
      <path d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" fill="#ffffff" fillRule="evenodd" />
    </svg>
  ),
  googleDocs: () => (
    <svg width="24" height="24" viewBox="0 0 47 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z" fill="#4285F4" />
      <path d="M11.75,47.2727273 L35.25,47.2727273 L35.25,44.3181818 L11.75,44.3181818 Z M11.75,53.1818182 L29.375,53.1818182 L29.375,50.2272727 L11.75,50.2272727 Z M11.75,32.5 L11.75,35.4545455 L35.25,35.4545455 L35.25,32.5 Z M11.75,41.3636364 L35.25,41.3636364 L35.25,38.4090909 L11.75,38.4090909 Z" fill="#F1F1F1" />
      <path d="M29.375,0 L29.375,13.2954545 C29.375,15.7440341 31.3467969,17.7272727 33.78125,17.7272727 L47,17.7272727 L29.375,0 Z" fill="#A1C2FA" />
    </svg>
  ),
  zapier: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.535 8.465l-1.32 3.15h5.535L8.465 23.25l1.32-3.15H4.25L15.535.75v7.715zM12 13.875l.84-2.005L12 9.865l-.84 2.005.84 2.005z" fill="#FF4F00" />
    </svg>
  ),
  messenger: () => (
    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <radialGradient id="msg-gr1" cx="11.087" cy="7.022" r="47.612" gradientTransform="matrix(1 0 0 -1 0 50)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1292ff" />
        <stop offset=".079" stopColor="#2982ff" />
        <stop offset=".23" stopColor="#4e69ff" />
        <stop offset=".351" stopColor="#6559ff" />
        <stop offset=".428" stopColor="#6d53ff" />
        <stop offset=".754" stopColor="#df47aa" />
        <stop offset=".946" stopColor="#ff6257" />
      </radialGradient>
      <path fill="url(#msg-gr1)" d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z" />
      <path fill="#ffffff" d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z" />
    </svg>
  ),
  // Small icons for flowing tags
  googleDriveSmall: () => (
    <svg width="16" height="16" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
      <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
      <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
    </svg>
  ),
  notionSmall: () => (
    <svg width="16" height="16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#ffffff" />
      <path d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917z" fill="#000000" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  ),
  whatsappSmall: () => (
    <svg width="16" height="16" viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg">
      <path d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z" fill="#25D366" />
    </svg>
  ),
  googleDocsSmall: () => (
    <svg width="16" height="16" viewBox="0 0 47 65" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.375,0 L4.40625,0 C1.9828125,0 0,1.99431818 0,4.43181818 L0,60.5681818 C0,63.0056818 1.9828125,65 4.40625,65 L42.59375,65 C45.0171875,65 47,63.0056818 47,60.5681818 L47,17.7272727 L29.375,0 Z" fill="#4285F4" />
      <path d="M29.375,0 L29.375,13.2954545 C29.375,15.7440341 31.3467969,17.7272727 33.78125,17.7272727 L47,17.7272727 L29.375,0 Z" fill="#A1C2FA" />
    </svg>
  ),
  zapierSmall: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.535 8.465l-1.32 3.15h5.535L8.465 23.25l1.32-3.15H4.25L15.535.75v7.715zM12 13.875l.84-2.005L12 9.865l-.84 2.005.84 2.005z" fill="#FF4F00" />
    </svg>
  ),
  messengerSmall: () => (
    <svg width="16" height="16" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1292ff" d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z" />
    </svg>
  ),
  slackSmall: () => (
    <svg width="16" height="16" viewBox="0 0 127 127" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A" />
      <path d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.1.7 54.2.7 46.9c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0" />
      <path d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.8C66.9 6.5 72.8.6 80.1.6c7.3 0 13.2 5.9 13.2 13.2v33.1z" fill="#2EB67D" />
      <path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E" />
    </svg>
  ),
  hubspotSmall: () => (
    <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FF7A59" d="M267.4 211.6c-25.1 23.7-40.8 57.3-40.8 94.6 0 37.3 15.7 70.9 40.8 94.6l-100.2 100.4C132 466.2 112.2 416 112.2 361.2c0-54.8 19.8-105 54.8-140L267.4 211.6z M390.4 76v73.6c-19.8 8.3-36.5 22.5-47.9 40.8l-75.2-75.2C291.1 91 318 76 348.2 76H390.4z M390.4 436v-73.6c-19.8-8.3-36.5-22.5-47.9-40.8l-75.2 75.2C291.1 421 318 436 348.2 436H390.4z M390.4 148.8V363.2c35 17.6 59.6 53.8 59.6 95.8 0 58.6-47.6 106.2-106.2 106.2-42 0-78.2-24.6-95.8-59.6H131.6c-17.6 35-53.8 59.6-95.8 59.6C-22.8 565.2-70.4 517.6-70.4 459c0-42 24.6-78.2 59.6-95.8V148.8C-45.8 131.2-70.4 95-70.4 53c0-58.6 47.6-106.2 106.2-106.2 42 0 78.2 24.6 95.8 59.6h116.4c17.6-35 53.8-59.6 95.8-59.6C402.4-53.2 450 -5.6 450 53c0 42-24.6 78.2-59.6 95.8z" />
    </svg>
  ),
  salesforceSmall: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#00A1E0" d="M10.006 5.17a4.168 4.168 0 0 1 3.322-1.632c1.655 0 3.078.962 3.757 2.355a4.792 4.792 0 0 1 1.816-.355c2.653 0 4.803 2.151 4.803 4.803 0 2.653-2.15 4.804-4.803 4.804-.326 0-.644-.033-.952-.095a3.894 3.894 0 0 1-3.396 1.987 3.87 3.87 0 0 1-1.753-.415 4.458 4.458 0 0 1-4.068 2.636c-2.122 0-3.907-1.47-4.385-3.447a4.01 4.01 0 0 1-.653.054C1.363 15.865 0 14.199 0 12.365c0-1.594 1.12-2.937 2.614-3.262a4.461 4.461 0 0 1-.278-1.547c0-2.475 2.006-4.481 4.481-4.481 1.536 0 2.89.774 3.7 1.95z" />
    </svg>
  ),
};
