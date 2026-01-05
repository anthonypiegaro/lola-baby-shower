"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

export const rsvpSchema = z.object({
  name: z.string().min(1, "name is required"),
  attending: z.enum(["Yes", "No"]),
  message: z.string().optional()
})

export type RSVPSchema = z.infer<typeof rsvpSchema>

export function RSVP() {
  const [submittedResponse, setSubmittedResponse] = useState<null | boolean>(null)

  if (submittedResponse !== null) {
    return <RSVPSuccess isGoing={submittedResponse} />
  }

  return <RSVPForm onSuccess={(response) => setSubmittedResponse(response)} />
}

function RSVPForm({ 
  onSuccess
}: {
  onSuccess: (response: boolean) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RSVPSchema>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      attending: "Yes",
      message: ""
    }
  })

  const onSubmit = async (values: RSVPSchema) => {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSuccess(values.attending === "Yes" ? true : false)

    setIsSubmitting(false)
  }

  return (
    <section id="rsvp" className="mt-25 px-5">
      <div className="w-full max-w-xl mx-auto bg-pink-300/20 backdrop-blur-sm rounded-xl py-5 px-5">
        <h2 
          className="text-4xl font-semibold text-center"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          RSVP
        </h2>
        <Form {...form}>
          <form className="flex flex-col gap-y-4">
            <FormField 
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isSubmitting}
                      autoComplete="off"
                      className="max-w-sm border-2 border-black/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="attending"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Will you be attending?</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="flex gap-x-5"
                      disabled={isSubmitting}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="Yes" id="Yes" className="border-2 border-black/20" />
                        <Label htmlFor="Yes">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="No" id="No" className="border-2 border-black/20" />
                        <Label htmlFor="No">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      className="border-2 border-black/20 w-full max-w-full min-w-0 h-50 resize-none mb-2 whitespace-pre-wrap break-words"
                      {...field}
                      disabled={isSubmitting}
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
          <Button 
            type="button" 
            className="mt-2 cursor-pointer" 
            disabled={isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
              {isSubmitting ? <><Spinner /> Submitting...</> : "Submit RSVP"}
          </Button>
        </Form>
      </div>
    </section>
  )
}

function RSVPSuccess({
  isGoing
}: {
  isGoing: boolean
}) {

  const yesMessage = "Thank you for coming to celebrate our growing family. We’re so excited to see you there!"
  const noMessage = "Thank you for letting us know. We’ll miss you but truly appreciate your love and support!"
  return (
    <section id="rsvp" className="mt-25 px-5">
      <div className="h-124 w-full flex justify-center items-center text-center text-lg font-semibold [font-family:var(--font-raleway)] max-w-xl mx-auto bg-pink-300/20 backdrop-blur-sm rounded-xl py-5 px-5">
        <p className="max-w-sm">{isGoing ? yesMessage : noMessage}</p>
      </div>
    </section>
  )
}
