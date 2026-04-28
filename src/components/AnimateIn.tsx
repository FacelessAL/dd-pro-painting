"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Start visible to prevent CLS on SSR/mobile - desktop will hide then animate
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only enable animations on desktop (768px+)
    if (window.innerWidth < 768) return;

    setShouldAnimate(true);
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const directionStyles = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    fade: "",
  };

  return (
    <div
      ref={ref}
      className={`${
        shouldAnimate
          ? `transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0 translate-x-0"
                : `opacity-0 ${directionStyles[direction]}`
            }`
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
