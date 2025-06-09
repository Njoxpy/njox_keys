import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../services/orderService";

const OrderedOrdersCard = ({ venue }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders(); // 🔥 await this
        setOrders(data || []); // fallback to empty array
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
        setOrders([]); // error fallback
      } finally {
        setLoading(false); // always stop loading
      }
    };
    getOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-slate-500">No orders found.</p>;
  }

  return (
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
          <p className="text-xs text-slate-500">
            Ordered by: {venue.orderedBy}
          </p>
        </div>
        <button className="text-blue-600 bg-blue-100 rounded-full px-3 py-1 text-sm mt-2 md:mt-0">
          View More
        </button>
      </div>
    </div>
  );
};

export default OrderedOrdersCard;
