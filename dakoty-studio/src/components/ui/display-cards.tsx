"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-5 text-white" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-[38rem] -skew-y-[8deg] select-none flex-col gap-4 rounded-2xl border-2 border-black/[0.08] bg-white px-8 py-7 transition-all duration-700 overflow-hidden hover:border-[#0071e3]/25 hover:shadow-xl",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-flex items-center justify-center rounded-full bg-[#0071e3] w-9 h-9 flex-shrink-0">
          {icon}
        </span>
        <p className={cn("text-xl font-bold leading-tight", titleClassName)}>{title}</p>
      </div>
      <p className="text-base text-[#4a4a4f] leading-relaxed">{description}</p>
      {date && <p className="text-sm text-[#86868b]/50">{date}</p>}
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 opacity-60 hover:opacity-100",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 opacity-60 hover:opacity-100",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
