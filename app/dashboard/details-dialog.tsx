"use client"

import { Check, X } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { RSVP } from "./types"

export function DetailsDialog({
  open,
  onOpenChange,
  rsvp
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  rsvp: RSVP
}) {
  const localDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(rsvp.createdAt)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-pink-200">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {rsvp.name}'s RSVP
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-x-1 text-muted-foreground">
            {rsvp.isGoing ? <><Check className="w-4 h-4 text-green-600" /> Going</> : <><X className="w-4 h-4 text-red-600" /> Not Going</>}
          </div>
          <div className="text-lg">
            <div>
              "{rsvp.message}"<br/>-{rsvp.name}
            </div>
          </div>
          <div className="self-end text-xs text-muted-foreground mt-1">
            RSVP’d on {localDate}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}