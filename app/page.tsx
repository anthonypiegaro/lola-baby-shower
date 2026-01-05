import Image from "next/image"
import { greatVibes, raleway } from "@/app/layout"

export default function Home() {
  return (
    <div className="w-dvw h-dvh grid-background py-10 overflow-x-hidden">
      <div className="w-full overflow-x-hidden flex justify-center px-5">
        <div className="bg-white border-5 border-pink-300 rounded-full pb-0 pt-5">
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
              <div>Saturday | March 7 | 11pm</div>
              <div className="flex flex-col items-center">
                <div>1289 Teal Hollow Dr</div>
                <a
                  href="https://maps.apple.com/?address=1289+Teal+Hollow+Dr,+Yuba+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  1289 Teal Hollow Dr
                </a>
                <a
                  href="https://maps.apple.com/?address=1289+Teal+Hollow+Dr,+Yuba+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Yuba City
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        fill="green"
        dominantBaseline="middle"
        textAnchor="middle"
        className=""
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