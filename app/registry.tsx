"use client"

import { Gift } from "lucide-react"

export function Registry() {
  return (
    <section className="wavy-section">
      <div className="relative h-[100px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          width="100%"
          height="100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <path
            fill="oklch(1 0 0)"
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          width="100%"
          height="100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <path
            fill="oklch(69.317% 0.20402 343.917 / 0.17)"
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
      <div className="relative -translate-y-1 pb-2">
        <div className="absolute w-full h-full bg-[oklch(1_0_0)] z-0" />
        <div className="relative bg-[oklch(69.317%_0.20402_343.917_/_0.17)] z-1">
          <Gift className="mx-auto h-18 w-18 [stroke-width:0.75] lg:[stroke-width:1.25]" />
          <h2 className="text-center text-3xl lg:text-5xl leading-relaxed mb-3" style={{ fontFamily: "var(--font-great-vibes)" }}>
            Lola Lyn's Baby Registry
          </h2>
          <div className="flex justify-center">
            <a 
              className="border border-2 border-black text-2xl px-5 hover:bg-white/30 transition-all" 
              style={{ fontFamily: "var(--font-raleway)" }}
              href="https://www.amazon.com/baby-reg/anthony-piegaro-march-2026-yubacity/2NCSCVXVQ4IU4"
              target="_blank"
            >
              Amazon
            </a>
          </div>
        </div>
      </div>
      <div className="relative -translate-y-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          width="100%"
          height="100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <path
            fill="oklch(1 0 0)"
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            transform="scale(1,-1) translate(0,-100)"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          width="100%"
          height="100"
          preserveAspectRatio="none"
          className="absolute"
        >
          <path
            fill="oklch(69.317% 0.20402 343.917 / 0.17)"
            d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z"
            transform="scale(1,-1) translate(0,-100)"
          />
        </svg>
      </div>
    </section>
  )
}