import Image from "next/image"
import { ArrowDown } from "lucide-react"

import { greatVibes, raleway } from "@/app/layout"

import { Registry } from "./registry"
import { RSVP } from "./rsvp"
import { InformationFooter } from "./information-footer"

export default function Home() {
  return (
    <div className="w-dvw h-dvh grid-background pt-10 overflow-x-hidden">
      <div className="w-full overflow-x-hidden flex justify-center px-5">
        <div className="bg-white border-5 border-pink-300/70 rounded-full pb-0 pt-5">
          <EllipticalText />
          <Image 
            src="/images/silly-goose-two.png"
            alt="a silly goose"
            width={250}
            height={250}
            className="-translate-y-25 mx-auto"
          />
          <div className="w-full flex flex-col items-center text-lg -translate-y-18">
            <div className={`${greatVibes.className} text-4xl mb-1`}>Baby Shower</div>
            <div className={`${raleway.className} text-xl mb-3`}>honoring</div>
            <div className={`${greatVibes.className} text-4xl mb-6`}>Lola Lyn Piegaro</div>
            <div className={`${raleway.className} flex flex-col items-center`}>
              <div>Saturday | March 7 | 11am</div>
              <div className="flex flex-col items-center">
                <div>1289 Teal Hollow Dr</div>
                <div>Yuba City</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center -translate-y-12">
            Given by Jennifer Bennis and Paige Griffin
          </div>
          <div className="flex justify-center -translate-y-10">
            <div className="p-1 rounded-full border">
              <ArrowDown />
            </div>
          </div>
        </div>
      </div>
      <Registry />
      <RSVP />
      <InformationFooter />
    </div> 
  )
}

export function EllipticalText() {
  return (
    <svg 
      className="w-full max-w-md h-auto "
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* The ellipse path */}
      <path
        id="ellipsePath"
        d="M 50 140 A 150 120 0 0 1 350 140"
        fill="transparent"
        stroke="transparent"
      />

      {/* The text following the ellipse */}
      <text
        fontSize="32"
        fontWeight="normal"
        fill=""
        dominantBaseline="middle"
        textAnchor="middle"
        className={`${raleway.className}`}
      >
        <textPath
          href="#ellipsePath"
          startOffset="50%"
          // optional: if you want the text centered
        >
          You are invited to a
        </textPath>
      </text>
    </svg>
  );
}