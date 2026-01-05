"use server"

import { db } from "@/db/db"
import { rsvp } from "@/db/schema"

import { RSVPSchema } from "./rsvp"

export const createRSVP = async (values: RSVPSchema) => {
  await db.insert(rsvp).values({
    name: values.name,
    isGoing: values.attending === "Yes",
    message: values.message
  })
}