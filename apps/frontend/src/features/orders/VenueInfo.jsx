// VenueInfo.jsx
import React from "react";

const VenueInfo = ({ venue }) => {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Venue Image */}
      <img
        src={venue.images[0]}
        alt={venue.name}
        className="w-full max-w-md rounded-lg shadow-md object-cover"
        style={{ aspectRatio: "16 / 9" }}
      />

      {/* Venue Details */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{venue.name}</h2>
        <p className="text-slate-700">Block: {venue.block}</p>
        <p className="text-slate-700">Capacity: {venue.capacity}</p>
      </div>
    </section>
  );
};

export default VenueInfo;
