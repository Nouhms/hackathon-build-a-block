import React from "react";
import { Button } from "@/components/ui/button";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

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

export default function Event({
  event,
  userID,
  userName,
  changed,
  setChanged,
}) {
  function formatDate(date) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log(date.seconds);
    const dateObj = new Date(date.seconds * 1000);
    return dateObj.toLocaleDateString("en-US", options);
  }

  async function handleJoinEvent() {
    console.log("joining...");

    console.log("old event " + JSON.stringify(event));
    console.log("user name is " + userName);

    console.log("old attendees is " + JSON.stringify(event.attendees));

    const newAttendees = [...event.attendees, { id: userID, name: userName }];
    event.attendees = newAttendees;
    console.log("new attendees " + JSON.stringify(newAttendees));
    // console.log("new event " + JSON.stringify(newEvent));

    const docRef = doc(db, "events", event.id);
    await setDoc(docRef, event);

    setChanged(++changed);
  }

  function conditionalButton() {
    const isUserInAttendees = event.attendees
      .map((attendeeObj) => attendeeObj.id)
      .includes(userID);
    console.log(
      "userID is " +
        userID +
        " attendees are " +
        JSON.stringify(event.attendees)
    );

    return isUserInAttendees ? (
      <Button
        variant="disabled"
        className="flex w-full max-w-sm items-center space-x-2 mt-2 mb-1"
      >
        Already Joined
      </Button>
    ) : (
      <Button
        type="submit"
        className="flex w-full max-w-sm items-center space-x-2 mt-2 mb-1"
        onClick={(_) => handleJoinEvent()}
      >
        Join
      </Button>
    );
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

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>show description</AccordionTrigger>
          <AccordionContent>{event.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>See attendees</AccordionTrigger>
          <AccordionContent>
            {event.attendees.map((attendee) => {
              return <p>{attendee.name}</p>;
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <CardFooter>{conditionalButton()}</CardFooter>
    </Card>
  );
}
