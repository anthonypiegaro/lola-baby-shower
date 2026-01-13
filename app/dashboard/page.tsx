import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"

import { db } from "@/db/db"
import { guest, rsvp } from "@/db/schema"
import { auth } from "@/lib/auth"

import { List } from "./list"
import { RSVP } from "./types"

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect("/auth")
  }

  const rsvpsRaw = await db
    .select({
      id: rsvp.id,
      name: rsvp.name,
      isGoing: rsvp.isGoing,
      guestId: guest.id,
      guest: guest.name,
      message: rsvp.message,
      createdAt: rsvp.createdAt
    })
    .from(rsvp)
    .leftJoin(guest, eq(guest.rsvpId, rsvp.id))
  
  const rsvpsById = rsvpsRaw.reduce((acc, rsvp) => {
    if (!(rsvp.id in acc)) {
      acc[rsvp.id] = {
        id: rsvp.id,
        name: rsvp.name,
        isGoing: rsvp.isGoing,
        guests: [],
        message: rsvp.message,
        createdAt: rsvp.createdAt
      }
    }

    if (rsvp.guest !== null && rsvp.guestId !== null) {
      acc[rsvp.id].guests.push({
        id: rsvp.guestId,
        name: rsvp.guest
      })
    }

    return acc
  }, {} as Record<string, RSVP>)

  const rsvps = Object.values(rsvpsById)

  const totalResponses = rsvps.length
  const totalAttending = rsvps.reduce((acc, rsvp) => {
    if (rsvp.isGoing) {
      acc = acc + rsvp.guests.length + 1
    }

    return acc
  }, 0)

  return (
    <div className="w-dvw h-dvh grid-background pt-10 overflow-x-hidden">
      <div className="text-4xl font-semibold flex justify-center mb-10">
        <span className="text-center rounded-md backdrop-blur-sm py-2 px-2">
          Lola Lynn's Baby Shower RSVP List
        </span>
      </div>
      <div className="flex justify-center gap-x-4 flex-wrap mb-5">
        <div className="rounded-md bg-pink-200 p-4 w-32">
          <div className="text-sm">Responses</div>
          <div className="text-4xl font-semibold">{totalResponses}</div>
        </div>
        <div className="rounded-md bg-pink-200 p-4 w-32">
          <div className="text-sm">Attending</div>
          <div className="text-4xl font-semibold">{totalAttending}</div>
        </div>
      </div>
      <List rsvps={rsvps} />
    </div>
  )
}