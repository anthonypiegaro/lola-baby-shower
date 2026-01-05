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
import { Textarea } from "@/components/ui/textarea"

export const rsvpSchema = z.object({
  name: z.string().min(1, "name is required"),
  attending: z.enum(["Yes", "No"]),
  message: z.string().optional()
})

export type RSVPSchema = z.infer<typeof rsvpSchema>

export function RSVP() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RSVPSchema>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      attending: "Yes",
      message: ""
    }
  })

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
                    <Input {...field} disabled={isSubmitting} className="max-w-sm border-2 border-black/20" />
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
          <Button type="button" className="mt-2 cursor-pointer">
              Submit RSVP
          </Button>
        </Form>
      </div>
    </section>
  )
}
