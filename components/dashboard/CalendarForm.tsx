"use client"

import React from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form"

const FormSchema = z.object({
  calendar: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

const CalendarFormComponent = () => {
  const { control, handleSubmit, setValue } = useFormContext()

  const onSubmit = (data: any) => {
    toast(`You have selected a date range: ${data.calendar.from.toDateString()} - ${data.calendar.to.toDateString()}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="  my-auto flex ">
      <FormField
        control={control}
        name="calendar"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CalendarDatePicker
                date={field.value}
                onDateSelect={({ from, to }) => {
                  setValue("calendar", { from, to })
                }}
                variant="secondary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="secondary" type="submit" className="mx-2 mt-2 ">
        Submit
      </Button>
    </form>
  )
}

const CalendarForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      calendar: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
  })

  return (
    <FormProvider {...formMethods}>
      <CalendarFormComponent />
    </FormProvider>
  )
}

export default CalendarForm
