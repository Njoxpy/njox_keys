import React from 'react';

const VenueCard = ({ venue }) => (
  <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm overflow-hidden">
    <img
      src={venue.image}
      alt={venue.name}
      className="w-full md:w-48 h-32 object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
    />
    <div className="flex-1 p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h3 className="font-bold text-slate-800">{venue.name}</h3>
        <p className="text-sm text-slate-600">{venue.block}</p>
      </div>
      <button className="text-blue-600 bg-blue-100 rounded-full px-3 py-1 text-sm mt-2 md:mt-0">
        View Details
      </button>
    </div>
  </div>
);

export default VenueCard;
