"use server"

import { db } from "@/db/db"
import { guest, rsvp } from "@/db/schema"

import { RSVPSchema } from "./rsvp"

export const createRSVP = async (values: RSVPSchema) => {
  console.log(JSON.stringify(values))

  await db.transaction(async tx => {
    await tx.insert(rsvp).values({
      id: values.uuid,
      name: values.name,
      isGoing: values.attending === "Yes",
      message: values.message
    })

    const guestValues = values.guests.map(guest => ({
      uuid: guest.uuid,
      rsvpId: values.uuid,
      name: guest.name
    }))

    if (guestValues.length > 0) {
      await tx.insert(guest).values(guestValues)
    }
  })
}