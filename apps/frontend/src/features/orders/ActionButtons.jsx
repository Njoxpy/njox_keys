// ActionButtons.jsx
import React from "react";

const ActionButtons = ({ status, onApprove, onBack }) => {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
      {status === "pending" && (
        <button
          onClick={onApprove}
          className="bg-blue-100 text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-200 transition"
          aria-label="Approve Order"
        >
          Approve Order
        </button>
      )}
      <button
        onClick={onBack}
        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
        aria-label="Back to Orders"
      >
        Back to Orders
      </button>
    </div>
  );
};

export default ActionButtons;
