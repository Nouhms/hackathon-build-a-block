import React from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Event({ event }) {
  function formatDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // return date.toISOString().split("T")[0];
    console.log(date.seconds);
    const dateObj = new Date(date.seconds * 1000);
    return dateObj.toLocaleDateString("en-US", options);
  }
  return (
    <Card className="max-w-sm my-3 justify-items-center">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>
          <p className="text-sm font-medium leading-none">
            organized by {event.creator}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>Location: {event.location}</CardDescription>
        <CardDescription>Date: {formatDate(event.date)}</CardDescription>
      </CardContent>
      <CardFooter>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>show description</AccordionTrigger>
            <AccordionContent>{event.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
