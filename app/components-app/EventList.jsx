import React from "react";
import Event from "./Event";

export default function EventList({ events }) {
  return (
    <div className="grid justify-items-center">
      {events.map((event) => {
        return <Event event={event} key={event.id} />;
      })}
    </div>
  );
}
