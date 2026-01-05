import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { db } from "@/db/db"
import { rsvp } from "@/db/schema"
import { auth } from "@/lib/auth"

import { List } from "./list"

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect("/auth")
  }

  const rsvps = await db.select().from(rsvp)

  // const rsvps = [
  //   {
  //     id: "b2facd0e-102a-4c7a-a093-9282b5b86a01",
  //     name: "Alice Carter",
  //     isGoing: true,
  //     message: "Excited to attend!",
  //     createdAt: new Date("2026-01-05T10:01:00Z"),
  //   },
  //   {
  //     id: "97dffab6-2cae-4254-98fe-28fcb578ef02",
  //     name: "Brian Nguyen",
  //     isGoing: false,
  //     message: "Sorry, can’t make it this time.",
  //     createdAt: new Date("2026-01-04T22:15:00Z"),
  //   },
  //   {
  //     id: "d703439e-eec0-4dcd-9896-eb703ff60c03",
  //     name: "Charlotte Lee",
  //     isGoing: true,
  //     message: "Count me in!",
  //     createdAt: new Date("2026-01-03T18:47:00Z"),
  //   },
  //   {
  //     id: "cc97f7dc-d299-44b7-b378-9469c1c1e604",
  //     name: "Daniel Kim",
  //     isGoing: true,
  //     message: "Looking forward to it.",
  //     createdAt: new Date("2026-01-04T14:10:00Z"),
  //   },
  //   {
  //     id: "c7e76dad-a491-4e54-80ab-e802bd5dc105",
  //     name: "Evelyn Walker",
  //     isGoing: false,
  //     message: "Out of town that weekend.",
  //     createdAt: new Date("2026-01-02T09:30:00Z"),
  //   },
  //   {
  //     id: "e6a84646-54d5-4b56-aaf8-16ffd8b8c206",
  //     name: "Felix Thompson",
  //     isGoing: true,
  //     message: "Wouldn’t miss it!",
  //     createdAt: new Date("2026-01-05T09:00:00Z"),
  //   },
  //   {
  //     id: "c25f4f81-51a8-4e74-b085-fefd0ae03907",
  //     name: "Grace Morales",
  //     isGoing: true,
  //     message: "Bringing dessert!",
  //     createdAt: new Date("2026-01-03T21:33:00Z"),
  //   },
  //   {
  //     id: "b7a54baf-990c-4c40-bd62-76974afbb708",
  //     name: "Henry Chen",
  //     isGoing: true,
  //     message: "Can I bring a friend?",
  //     createdAt: new Date("2026-01-03T12:18:00Z"),
  //   },
  //   {
  //     id: "c5dde58d-c136-4d69-9f33-a24e06a8e909",
  //     name: "Isabella Robinson",
  //     isGoing: false,
  //     message: "Busy with family plans.",
  //     createdAt: new Date("2026-01-01T11:50:00Z"),
  //   },
  //   {
  //     id: "7a4ae19c-64f6-4dee-afaf-804c09b5ee10",
  //     name: "Jack Patel",
  //     isGoing: true,
  //     message: "See you all there!",
  //     createdAt: new Date("2026-01-05T07:24:00Z"),
  //   },
  //   {
  //     id: "f3db2249-6c48-4a6d-898d-a009f0815811",
  //     name: "Kara Davis",
  //     isGoing: true,
  //     message: "So excited!",
  //     createdAt: new Date("2026-01-04T19:41:00Z"),
  //   },
  //   {
  //     id: "ef5332d2-12a2-47f8-a777-ae158cccb112",
  //     name: "Leo González",
  //     isGoing: false,
  //     message: "Have fun everyone!",
  //     createdAt: new Date("2026-01-02T17:02:00Z"),
  //   },
  //   {
  //     id: "365805e2-0370-4382-9e34-0dd899d13a13",
  //     name: "Mia Johnson",
  //     isGoing: true,
  //     message: "Can’t wait to see everyone again!",
  //     createdAt: new Date("2026-01-03T16:03:00Z"),
  //   },
  //   {
  //     id: "fb75c7d3-0ae9-43e3-9506-e080901fa514",
  //     name: "Noah Brooks",
  //     isGoing: true,
  //     message: "Let’s go!",
  //     createdAt: new Date("2026-01-04T12:40:00Z"),
  //   },
  //   {
  //     id: "a9cf6502-8ad2-4620-b81d-2840646c2715",
  //     name: "Olivia Wright",
  //     isGoing: false,
  //     message: "Sending love from afar.",
  //     createdAt: new Date("2026-01-01T21:57:00Z"),
  //   },
  //   {
  //     id: "c3b14f76-cbe3-421f-b470-98a0e5470816",
  //     name: "Parker Sanchez",
  //     isGoing: true,
  //     message: "I’ll bring drinks.",
  //     createdAt: new Date("2026-01-05T08:50:00Z"),
  //   },
  //   {
  //     id: "1db198ef-0d29-4e75-acaf-b0829a72ea17",
  //     name: "Quinn Mitchell",
  //     isGoing: false,
  //     message: "Can’t join this time.",
  //     createdAt: new Date("2026-01-02T15:46:00Z"),
  //   },
  //   {
  //     id: "c8392e53-afbc-4b6c-94ae-cdf444c68818",
  //     name: "Riley Adams",
  //     isGoing: true,
  //     message: "Pumped for this!",
  //     createdAt: new Date("2026-01-03T23:17:00Z"),
  //   },
  //   {
  //     id: "387b43f4-6bbb-45a9-84a4-9818b7e84419",
  //     name: "Sophia Perez",
  //     isGoing: true,
  //     message: "I’ll be there early to help set up.",
  //     createdAt: new Date("2026-01-04T09:28:00Z"),
  //   },
  //   {
  //     id: "73fa9f65-b286-4ceb-b062-3f27a6c65320",
  //     name: "Tyler Brooks",
  //     isGoing: false,
  //     message: "Hope to make the next one!",
  //     createdAt: new Date("2026-01-05T06:32:00Z"),
  //   },
  // ]

  const totalResponses = rsvps.length
  const totalAttending = rsvps.reduce((acc, rsvp) => {
    if (rsvp.isGoing) {
      acc++
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