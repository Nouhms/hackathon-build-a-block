"use client"

import EventList from "./components-app/EventList";
import { CreateEvent } from "./components-app/CreateEvent";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase/index";
import { auth } from "@/app/firebase/auth";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [eventList, setEventList] = useState([]);
  const [changed, setChanged] = useState(0);

  async function getData() {
    const eventsCollectionRef = collection(db, "events");
    const results = await getDocs(eventsCollectionRef);
    console.log(results);
    const events = [];
    results.docs.forEach((doc) => {
      events.push(doc.data());
    });

    setEventList(events);
    console.log(events);
  }

  useEffect(() => {
    getData();
  }, [changed]);

  return (
    <div>
      <CreateEvent changed={changed} setChanged={setChanged} />
      <EventList events={eventList} />
    </div>
  );
}
