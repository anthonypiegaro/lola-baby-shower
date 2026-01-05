"use client"

import { Gift } from "lucide-react"

export function Registry() {
  return (
    <section className="wavy-section">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        width="100%"
        height="100"
        preserveAspectRatio="none"
      >
        <path
          fill="oklch(89.9 0.061 343.231)"
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
        />
      </svg>
      <div className="bg-[oklch(89.9_0.061_343.231))] -translate-y-1 pb-2">
        <Gift className="mx-auto h-18 w-18 [stroke-width:0.75] lg:[stroke-width:1.25]" />
        <h2 className="text-center text-3xl lg:text-5xl leading-relaxed mb-3" style={{ fontFamily: "var(--font-great-vibes)" }}>
          Lola Lynn's Baby Registry
        </h2>
        <div className="flex justify-center">
          <a 
            className="border border-2 border-black text-2xl px-5" 
            style={{ fontFamily: "var(--font-raleway)" }}
            href="https://www.amazon.com/baby-reg/anthony-piegaro-march-2026-yubacity/2NCSCVXVQ4IU4"
            target="_blank"
          >
            Amazon
          </a>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        width="100%"
        height="100"
        preserveAspectRatio="none"
        className="-translate-y-2"
      >
        <path
          fill="oklch(89.9 0.061 343.231)"
          d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          transform="scale(1,-1) translate(0,-100)"
        />
      </svg>
    </section>
  )
}