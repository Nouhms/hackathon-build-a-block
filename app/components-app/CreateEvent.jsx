"use client";
import { db } from "../firebase/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/auth";

const FormSchema = z.object({
  date: z.date({
    required_error: "The event should have a date in the future.",
  }),
  // title: z.string(),
  // description: "",
  // creator: "",
  // location: "",
});

export function CreateEvent({ changed, setChanged }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data) {
    console.log(data.date);
    setDate(data.date);
    const event = {
      title: title,
      description: description,
      location: location,
      date: date,
      creator: creator,
      id: uuidv4(),
      owner: auth.currentUser.uid,
      attendees: [auth.currentUser.uid],
    };
    await addEventToDB(event);
    console.log("done");
    setChanged(++changed);
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [creator, setCreator] = useState("");

  function handleTitleChange(e) {
    setTitle(e.target.value);
    console.log(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
    console.log(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
    console.log(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    console.log(e.target.value);
  }

  function handleCreatorChange(e) {
    setCreator(e.target.value);
    console.log(e.target.value);
  }

  async function addEventToDB(event) {
    const docRef = doc(db, "events", event.id);
    await setDoc(docRef, event);
    setTitle("");
    setCreator("");
    setDate();
    setLocation("");
    setDescription("");
  }

  return (
    <div className="grid justify-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel>Title</FormLabel>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    placeholder="Enter the title of event"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel>Description</FormLabel>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Textarea
                    placeholder="Give your event a description."
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel>Location</FormLabel>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    placeholder="Ntn'l Highway, Purok Dos, Kabankalan, Neg. Occ."
                    value={location}
                    onChange={handleLocationChange}
                  />
                </div>
                <FormDescription>
                  Enter the location of your event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel>Date of the Event</FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    value={date}
                    onChange={handleDateChange}
                  >
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Choose the date of your event</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem className="flex flex-col  mb-4">
                <FormLabel>Event Creator Name</FormLabel>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Input
                    placeholder="Juan Dela P. Cruz"
                    value={creator}
                    onChange={handleCreatorChange}
                  />
                </div>
                <FormDescription>
                  Enter the full name of the event creator
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
