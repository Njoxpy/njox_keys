import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";

// Mock orders data (like a fake API response)
const MOCK_ORDERS = [
  {
    _id: "22",
    venue: {
      name: "Computer Science Lecture Hall",
      block: "Block-A",
      capacity: 120,
      images: [
        "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg",
      ],
    },
    student: {
      name: "John Doe",
      email: "john@example.com",
      studentId: "S123456",
    },
    employee: {
      name: "Jane Smith",
      email: "jane@example.com",
      employeeId: "E987654",
    },
    status: "pending",
    createdAt: "2025-05-28T12:34:56Z",
  },
  {
    _id: "order_id_67890",
    venue: {
      name: "Engineering Workshop",
      block: "Block-B",
      capacity: 50,
      images: [
        "https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg",
      ],
    },
    student: {
      name: "Alice Johnson",
      email: "alice@example.com",
      studentId: "S654321",
    },
    employee: {
      name: "Bob Martin",
      email: "bob@example.com",
      employeeId: "E123789",
    },
    status: "approved",
    createdAt: "2025-05-27T09:20:00Z",
  },
];

export default function OrderDetailsPage() {
  const { id } = useParams(); // <-- Use 'id' to match your route param
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching order by id
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const foundOrder = MOCK_ORDERS.find((o) => o._id === id);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 1000); // simulate 1 sec delay

    return () => clearTimeout(timer);
  }, [id]);

  // Update status locally on approve
  function handleApprove() {
    setOrder((prev) => prev && { ...prev, status: "approved" });
  }

  // Dummy back function
  function handleBack() {
    console.log("Back to Orders clicked");
    // Ideally: useNavigate from react-router-dom for real navigation
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-800">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600 font-semibold">
        Order not found
      </div>
    );
  }

  // Format date nicely
  const createdDate = new Date(order.createdAt);
  const formattedDate = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Status badge colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
  };

  return (
    <>
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-800 text-white rounded-md px-4 py-3 mb-6">
          <h1 className="text-xl font-semibold">Order ID: {order._id}</h1>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              statusColors[order.status] || "bg-gray-200 text-gray-700"
            }`}
          >
            {order.status.toUpperCase()}
          </span>
        </header>

        {/* Venue Info */}
        <section className="mb-6">
          <h2 className="text-slate-800 font-semibold mb-2 text-lg">
            Venue Info
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <img
              src={order.venue.images[0]}
              alt={order.venue.name}
              className="w-full md:w-48 h-32 object-cover rounded-md"
            />
            <div className="text-slate-800">
              <p>
                <strong>Name:</strong> {order.venue.name}
              </p>
              <p>
                <strong>Block:</strong> {order.venue.block}
              </p>
              <p>
                <strong>Capacity:</strong> {order.venue.capacity}
              </p>
            </div>
          </div>
        </section>

        {/* Student Info */}
        <section className="mb-6">
          <h2 className="text-slate-800 font-semibold mb-2 text-lg">
            Student Info
          </h2>
          <p>
            <strong>Name:</strong> {order.student.name}
          </p>
          <p>
            <strong>Email:</strong> {order.student.email}
          </p>
          <p>
            <strong>Student ID:</strong> {order.student.studentId}
          </p>
        </section>

        {/* Employee Info */}
        <section className="mb-6">
          <h2 className="text-slate-800 font-semibold mb-2 text-lg">
            Employee Info
          </h2>
          <p>
            <strong>Name:</strong> {order.employee.name}
          </p>
          <p>
            <strong>Email:</strong> {order.employee.email}
          </p>
          <p>
            <strong>Employee ID:</strong> {order.employee.employeeId}
          </p>
        </section>

        {/* Created Date */}
        <section className="mb-6">
          <h2 className="text-slate-800 font-semibold mb-2 text-lg">
            Created At
          </h2>
          <p>{formattedDate}</p>
        </section>

        {/* Buttons */}
        <div className="flex gap-4">
          {order.status === "pending" && (
            <button
              onClick={handleApprove}
              className="text-blue-600 bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 transition"
            >
              Approve Order
            </button>
          )}
          <button
            onClick={handleBack}
            className="text-blue-600 bg-blue-100 px-4 py-2 rounded-md hover:bg-blue-200 transition"
          >
            Back to Orders
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
