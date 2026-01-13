"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
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

import { createRSVP } from "./create-rsvp.action"

export const rsvpSchema = z.object({
  uuid: z.uuid(),
  name: z.string().min(1, "name is required"),
  attending: z.enum(["Yes", "No"]),
  guests: z.array(z.object({
    uuid: z.uuid(),
    name: z.string().min(1, "name is required")
  })),
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
      uuid: uuidv4(),
      name: "",
      attending: "Yes",
      guests: [],
      message: ""
    }
  })

  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: "guests"
  })

  const onSubmit = async (values: RSVPSchema) => {
    setIsSubmitting(true)

    await createRSVP(values)
      .then(() => {
        onSuccess(values.attending === "Yes" ? true : false)
      })
      .catch(e => {
        console.log(e.message)
      })


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
                      className="max-w-sm border-2 border-black/20" 
                    />
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
            {
              form.watch("attending") === "Yes" && (
                <div className="w-full flex flex-col gap-y-2">
                  <Label className="mb-1">Extra Guests (optional)</Label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-x-2">
                      <FormField 
                        key={field.id}
                        name={`guests.${index}.name`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem
                            className="grow max-w-sm"
                          >
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={isSubmitting}
                                autoComplete="off"
                                className="w-full border-2 border-black/20" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        variant="ghost" 
                        onClick={() => remove(index)}
                        disabled={isSubmitting}
                        className="cursor-pointer hover:bg-black/20"
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button" 
                    variant="outline"
                    className="self-start cursor-pointer mt-1 bg-transparent hover:bg-black/10 border-2 border-black/40"
                    onClick={() => append({ uuid: uuidv4(), name: "" })}
                  >
                    Add extra guest
                  </Button>
                </div>
              )
            }
            <FormField 
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message to the Parents</FormLabel>
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
