"use client"

import EventList from "../components-app/EventList";
import { CreateEvent } from "../components-app/CreateEvent";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";
import { auth } from "../firebase/auth";
import { useEffect, useState } from "react";
import handleLogOut from "../utils/useLogout";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


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
  console.log("this is auth " + JSON.stringify(auth));

  const user = auth.currentUser
  let userID = "";
  let userName = "";
  if (user != null) {
    userID = user.uid
    userName = user.displayName ?? user.email
  }

  const router = useRouter();

  return (
    <div>
      <div className="grid w-full justify-items-center my-10">
        <h2 className="border-b-2">Welcome {userName}</h2>
        <Button type="submit" variant="destructive" className="max-w-sm w-full mt-5" onClick={() => { handleLogOut(); router.push("/") }}>
          Logout
        </Button>
      </div>
      <CreateEvent changed={changed} setChanged={setChanged} />
      <EventList events={eventList} userID={userID} userName={userName} changed={changed} setChanged={setChanged} />
    </div>
  );
}
