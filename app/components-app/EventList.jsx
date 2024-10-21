import React from "react";
import Event from "./Event";
import { auth } from "../firebase/auth";

export default function EventList({
  events,
  userID,
  userName,
  changed,
  setChanged,
}) {
  return (
    <div className="grid justify-items-center">
      {events.map((event) => {
        return (
          <Event
            event={event}
            key={event.id}
            userID={userID}
            userName={userName}
            changed={changed}
            setChanged={setChanged}
          />
        );
      })}
    </div>
  );
}
