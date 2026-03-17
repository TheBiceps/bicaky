import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";

interface FloatingIcon {
  icon: React.ReactNode;
  label: string;
  position: { x: string; y: string };
}

interface Web3MediaHeroProps {
  title: string;
  highlightedText?: string;
  subtitle: string;
  ctaButton?: {
    label: string;
    onClick: () => void;
  };
  floatingIcons?: FloatingIcon[];
  trustedByText?: string;
  brands?: Array<{
    name: string;
    logo: React.ReactNode;
  }>;
  className?: string;
  children?: React.ReactNode;
  /** Background gradient style override */
  backgroundStyle?: React.CSSProperties;
  /** Glow color for the radial background */
  glowColor?: string;
  /** Highlight gradient for the title text */
  highlightGradient?: string;
  /** Icon container styles */
  iconStyle?: {
    background?: string;
    border?: string;
    boxShadow?: string;
  };
}

export function Web3MediaHero({
  title,
  highlightedText,
  subtitle,
  ctaButton,
  floatingIcons = [],
  trustedByText = "Trusted by",
  brands = [],
  className,
  children,
  backgroundStyle,
  glowColor = "rgba(0, 113, 227, 0.12)",
  highlightGradient = "linear-gradient(90deg, #0071e3 0%, #34a3ff 50%, #0071e3 100%)",
  iconStyle,
}: Web3MediaHeroProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex flex-col overflow-hidden",
        className
      )}
      style={
        backgroundStyle || {
          background:
            "linear-gradient(180deg, #ffffff 0%, #f8fbff 50%, #f0f6ff 100%)",
        }
      }
      role="banner"
      aria-label="Hero section"
    >
      {/* Animated Infinite Grid Background */}
      <InfiniteGrid
        hoverOpacity={0.45}
        revealRadius={400}
        speedX={0.25}
        speedY={0.25}
        cellSize={44}
        color="#0071e3"
        smoothing={0.1}
        className="z-[5]"
      />

      {/* Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
        <div
          className="absolute"
          style={{
            width: "1200px",
            height: "1200px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Main Content */}
      {children ? (
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">
          {children}
        </div>
      ) : (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
          {/* Floating Icons */}
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
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: iconStyle?.background || "rgba(0, 113, 227, 0.06)",
                  backdropFilter: "blur(10px)",
                  border:
                    iconStyle?.border || "1px solid rgba(0, 113, 227, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    iconStyle?.boxShadow || "0 0 40px rgba(0, 113, 227, 0.12)",
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#86868b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center max-w-4xl"
            style={{ gap: "32px" }}
          >
            {/* Title */}
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: "1.1",
                color: "#1d1d1f",
                letterSpacing: "-0.025em",
              }}
            >
              {title}
              {highlightedText && (
                <>
                  <br />
                  <span
                    style={{
                      background: highlightGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 600,
                      fontStyle: "italic",
                    }}
                  >
                    {highlightedText}
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: "1.6",
                color: "#86868b",
                maxWidth: "540px",
              }}
            >
              {subtitle}
            </p>

            {/* CTA Button */}
            {ctaButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(0,113,227,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={ctaButton.onClick}
                className="px-8 py-3.5 rounded-full transition-all"
                style={{
                  background: "#0071e3",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  boxShadow: "0 4px 20px rgba(0, 113, 227, 0.2)",
                }}
              >
                {ctaButton.label}
              </motion.button>
            )}
          </motion.div>
        </div>
      )}

      {/* Brand Slider */}
      {brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative z-10 w-full overflow-hidden"
          style={{
            paddingTop: "48px",
            paddingBottom: "48px",
          }}
        >
          {/* "Trusted by" Text */}
          <div className="text-center mb-8">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#86868b",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {trustedByText}
            </span>
          </div>

          {/* Gradient Overlays */}
          <div
            className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: "200px",
              background:
                "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
            style={{
              width: "200px",
              background:
                "linear-gradient(270deg, #ffffff 0%, rgba(255,255,255,0) 100%)",
            }}
          />

          {/* Scrolling Brands */}
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -(brands.length * 200)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: brands.length * 5,
                ease: "linear",
              },
            }}
            style={{
              gap: "80px",
              paddingLeft: "80px",
            }}
          >
            {/* Duplicate brands for seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity"
                style={{
                  width: "120px",
                  height: "40px",
                }}
              >
                {brand.logo}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
