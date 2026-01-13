"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { RSVP } from "./types"
import { DetailsDialog } from "./details-dialog"

const dummyRSVP: RSVP = {
  id: "",
  name: "",
  isGoing: true,
  guests: [],
  message: "",
  createdAt: new Date()
}

export function List({
  rsvps
}: {
  rsvps: RSVP[]
}) {
  const [rsvpDetails, setRSVPDetails] = useState<null | RSVP>(null)

  const handleRSVPDetailsOpenChange = (open: boolean) => {
    if (!open) {
      setRSVPDetails(null)
    }
  }

  if (rsvps.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-center">No RSVPs</h2>
      </div>
    )
  }

  return (
    <>
      <DetailsDialog 
        open={rsvpDetails !== null}
        onOpenChange={handleRSVPDetailsOpenChange}
        rsvp={rsvpDetails ?? dummyRSVP}
      />
      <div className="mx-auto w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl px-5 mb-10">
        {rsvps.map(rsvp => {
          const localDate = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/Los_Angeles",
            dateStyle: "medium",
            timeStyle: "short",
          }).format(rsvp.createdAt)

          return (
            <div
              key={rsvp.id}
              className="cursor-pointer rounded-md shadow-sm bg-pink-200 p-4"
              onClick={() => setRSVPDetails(rsvp)}
            >
              <div className="text-lg font-medium">{rsvp.name}</div>
              <div className="flex items-center text-sm font-medium gap-x-1">
                {rsvp.isGoing ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                {rsvp.isGoing ? "Attending" : "Not Attending"}
              </div>
              {rsvp.guests.length > 0 && <div>plus {rsvp.guests.length} additional guests.</div>}
              <div className="text-xs text-muted-foreground mt-1">
                RSVP’d on {localDate}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}