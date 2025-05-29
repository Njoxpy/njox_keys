// src/components/VenueCard.jsx

import { Link } from "react-router-dom";

const VenueCard = ({ venue }) => {
  return (
    <div className="bg-white text-slate-800 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={venue.images[0]}
        alt={venue.name}
        className="rounded-xl h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-bold mb-1">{venue.name}</h3>
      <p className="text-sm mb-1">📍 {venue.block}</p>
      <p className="text-sm mb-1">👥 Capacity: {venue.capacity}</p>
      <span className="text-blue-600 bg-blue-100 px-2 py-1 text-xs rounded-full w-max mb-2">
        {venue.status}
      </span>
      <Link to={venue.name}>
        <button className="mt-auto bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 text-sm">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default VenueCard;
