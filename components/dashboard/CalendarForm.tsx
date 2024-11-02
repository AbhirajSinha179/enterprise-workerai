import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormItem, FormControl, FormMessage, FormField } from "@/components/ui/form";
import moment from "moment";

// Define the schema for the form
const FormSchema = z.object({
  calendar: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

interface CalendarFormProps {
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

// Component to handle the calendar form
const CalendarFormComponent: React.FC<CalendarFormProps> = ({ setStartDate, setEndDate }) => {
  const { control, handleSubmit, setValue } = useFormContext();

  const onSubmit = async (data: any) => {
    const startDate = data.calendar.from.toISOString();
    const endDate = data.calendar.to.toISOString();
    const formattedStartDate = encodeURIComponent(moment(new Date(startDate)).startOf("day").toISOString());
    const formattedEndDate = encodeURIComponent(moment(new Date(endDate)).endOf("day").toISOString());
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    toast(`You have selected a date range: ${data.calendar.from.toDateString()} - ${data.calendar.to.toDateString()}`);
  };

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
  );
};

// Main component that wraps the form with FormProvider
const CalendarForm: React.FC<CalendarFormProps> = ({ setStartDate, setEndDate }) => {
  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      calendar: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
  });

  return (
    <FormProvider {...formMethods}>
      <CalendarFormComponent
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </FormProvider>
  );
};

export default CalendarForm;
