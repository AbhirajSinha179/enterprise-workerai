"use client"

import React from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Form, FormItem, FormControl, FormMessage, FormField } from "@/components/ui/form"
import { dashboardDataSchema } from "@/types/interface"
import { fetchDashboardDataUsingRange } from "@/app/(main)/dashboard/page"

// Define the schema for the form
const FormSchema = z.object({
  calendar: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

// Function to fetch data from the API
// export async function fetchDashboardDataUsingRange(type: string, id: string, startDate: string, endDate: string) {
//   try {
//     console.log("API FETCH FUNCTION CALLED")
//     // Format the dates using native Date object and encode the URI components


//     const url = `${process.env.API_BASE_URL}/analytics/${type}/${id}/range?start=${startDate}&end=${endDate}`;
//     const res = await fetch(url);

//     console.log("ENDPOINT IS ", url);
//     console.log(`Response status for analytics: ${res.status}`);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data. Status code: ${res.status}`);
//     }

//     const data = await res.json();
//     const result = dashboardDataSchema.safeParse(data);

//     if (!result.success) {
//       console.error(result.error);
//       throw new Error("Invalid data format");
//     }

//     return result.data;
//   } catch (error: any) {
//     console.error("Error fetching data:", error.message);
//     throw error;
//   }
// }

// Component to handle the calendar form
const CalendarFormComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const { control, handleSubmit, setValue } = useFormContext()

  const onSubmit = async (data: any) => {
    const startDate = data.calendar.from.toISOString();
    const endDate = data.calendar.to.toISOString();
    const formattedStartDate = encodeURIComponent(new Date(startDate).toISOString());
    const formattedEndDate = encodeURIComponent(new Date(endDate).toISOString());
    // console.log("ONSUBMIT FUNCTION DATE :  ", formattedStartDate, formattedEndDate)
    const dashboardData = await fetchDashboardDataUsingRange("targetId", userId, formattedStartDate, formattedEndDate);
    toast(`You have selected a date range: ${data.calendar.from.toDateString()} - ${data.calendar.to.toDateString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-auto flex">
      <FormField
        control={control}
        name="calendar"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <CalendarDatePicker
                date={field.value}
                onDateSelect={({ from, to }) => {
                  setValue("calendar", { from, to });
                }}
                variant="secondary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="secondary" type="submit" className="mx-2 mt-2">
        Submit
      </Button>
    </form>
  )
}

// Main component that wraps the form with FormProvider
const CalendarForm: React.FC<{ userId: string }> = ({ userId }) => {
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
      <CalendarFormComponent userId={userId} />
    </FormProvider>
  )
}

export default CalendarForm;
