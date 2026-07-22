"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion as motionTokens } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { getTransition, getViewport, type MotionDuration, type ViewportConfig } from "../config";
import { textChar } from "../variants";

type RevealTag = "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";

type RevealTextProps = {
  text: string;
  mode?: "words" | "chars";
  as?: RevealTag;
  className?: string;
  delay?: number;
  duration?: MotionDuration;
  once?: boolean;
  animateOnMount?: boolean;
  viewport?: ViewportConfig;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "animate" | "initial" | "variants" | "dangerouslySetInnerHTML"
>;

const motionTags = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  span: motion.span,
  div: motion.div,
} as const;

/**
 * Staggered text reveal for headlines / CTAs (Motion System page load).
 */
export function RevealText({
  text,
  mode = "words",
  as = "p",
  className,
  delay = 0,
  duration = "normal",
  once = true,
  animateOnMount = false,
  viewport,
  ...props
}: RevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motionTags[as];
  const parts =
    mode === "chars"
      ? Array.from(text)
      : text.split(/(\s+)/).filter((part) => part.length > 0);

  if (prefersReducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  return (
    <MotionTag
      className={cn(as === "span" ? "inline" : undefined, className)}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={getViewport({ once, ...viewport })}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren:
              mode === "chars"
                ? motionTokens.stagger / 2
                : motionTokens.stagger,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {parts.map((part, index) => {
        if (/^\s+$/.test(part)) {
          return <span key={`space-${index}`}>{part}</span>;
        }

        return (
          <motion.span
            key={`${part}-${index}`}
            className="inline-block"
            variants={textChar}
            transition={getTransition(duration)}
          >
            {part}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}
