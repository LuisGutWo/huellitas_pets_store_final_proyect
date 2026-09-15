"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { formatAmount } from "@/lib/format";

/**
 * El numeral troquelado. Cuando el valor cambia no salta: la cifra recorre
 * el trayecto y la plancha asienta con un rebote corto, como un troquel que
 * golpea el papel. Con prefers-reduced-motion se imprime el valor final.
 */
export default function StampedNumber({
  value,
  prefix = "$",
  className,
}: {
  value: number;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      shown.current = value;
      node.textContent = `${prefix}${formatAmount(value)}`;
      return;
    }

    const counter = { amount: shown.current };

    const tween = gsap.to(counter, {
      amount: value,
      duration: 0.62,
      ease: "power3.out",
      onUpdate: () => {
        node.textContent = `${prefix}${formatAmount(Math.round(counter.amount))}`;
      },
      onComplete: () => {
        shown.current = value;
      },
    });

    const settle = gsap.fromTo(
      node,
      { scaleY: 0.955, y: -2 },
      {
        scaleY: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(2.4)",
        transformOrigin: "50% 100%",
      }
    );

    return () => {
      tween.kill();
      settle.kill();
    };
  }, [value, prefix]);

  return (
    <span ref={ref} className={className} data-numeral>
      {`${prefix}${formatAmount(value)}`}
    </span>
  );
}
