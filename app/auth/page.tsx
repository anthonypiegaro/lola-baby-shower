"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Feather } from "lucide-react"
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
import { Spinner } from "@/components/ui/spinner"

import { authClient } from "@/lib/auth-client"

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const signInSchema = z.object({
  email: z.string().min(1, "email is requried"),
  password: z.string().min(1, "password is required")
})

export type SignInSchema = z.infer<typeof signInSchema>

export default function Auth() {
  const [submitting, setIsSubmitting] = useState(false)
  const [signInError, setSignInError] = useState<string | null>(null)

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: SignInSchema) => {
    setIsSubmitting(true)
    const { data, error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        rememberMe: true,
        callbackURL: "/dashboard",
    })

    if (error) {
      setSignInError(error.message ?? "")
    } else {
      setSignInError(null)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="w-dvw h-dvh flex flex-col justify-center items-center">
      <div className="">
        <Feather className="h-13 w-13 mb-3 mx-auto" />
        <div className="mb-4">
          <h2 className="text-xl font-medium leading-none">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">Sign in with your provided credentials</p>
        </div>
        <Form {...form}>
          <form className="flex flex-col gap-y-4 mb-6">
            <FormField 
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="w-65" {...field} disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="w-65" {...field} disabled={submitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          {signInError && <p className="text-sm text-destructive">{signInError}</p>}
          <Button 
            className="w-full"
            type="button" 
            onClick={form.handleSubmit(onSubmit)}
          >
            {submitting && <Spinner />}
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </Form>
      </div>
    </div>
  )
}