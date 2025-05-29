import React from "react";
import { Link } from "react-router-dom";

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const OrderCard = ({ name, block, image, orderedBy, orderDate }) => (
  <div className="flex flex-col md:flex-row items-center bg-white shadow border rounded-lg overflow-hidden">
    <img
      src={image}
      alt={name}
      onError={(e) => (e.target.src = "/fallback.jpg")}
      className="w-full md:w-40 h-40 object-cover rounded-xl m-4"
    />
    <div className="flex-1 px-4 py-2">
      <h3 className="font-bold text-slate-800">{name}</h3>
      <p className="text-slate-600">{block}</p>
      <p className="text-slate-500 text-sm">
        Ordered by {orderedBy} on {formatDate(orderDate)}
      </p>
    </div>
    <div className="p-4">
      <Link to={`22`}>
        <button className="border border-slate-400 px-4 py-1 rounded-full text-sm text-slate-700">
          View More
        </button>
      </Link>
    </div>
  </div>
);

export default OrderCard;
