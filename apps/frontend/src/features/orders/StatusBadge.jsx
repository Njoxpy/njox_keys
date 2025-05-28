// StatusBadge.jsx
import React from "react";

const StatusBadge = ({ status }) => {
  // Determine badge styles based on status
  const baseClasses =
    "px-3 py-1 rounded-full font-semibold text-sm uppercase select-none";

  const statusStyles = {
    pending: "bg-yellow-200 text-yellow-800",
    approved: "bg-green-200 text-green-800",
  };

  return (
    <span className={`${baseClasses} ${statusStyles[status] || "bg-gray-200"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
