import React, { useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import OrderCard from './OrderCard';
import Pagination from '../../components/Pagination';
import Footer from '../../components/footer';

const mockOrders = [
  {
    name: "New Lecture Hall (NLH4)",
    block: "Block C",
    image: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg",
    orderedBy: "Njox Nyagawa",
    orderDate: "2025-05-01T12:00:00Z",
  },
  // Add more mock data as needed
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 8;

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500); // Simulate loading
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter(
      order =>
        order.name.toLowerCase().includes(query) ||
        order.orderedBy.toLowerCase().includes(query)
    );
  }, [orders, search]);

  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  return (
   <>
    <div className="bg-slate-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-slate-700 mb-4">
          Manage Keys And Access
        </h1>

        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Recently Ordered Venues</h2>

          {loading ? (
            <p className="text-slate-500 text-center">Loading orders...</p>
          ) : currentOrders.length === 0 ? (
            <p className="text-slate-500 text-center">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {currentOrders.map(order => (
                <OrderCard key={order.name} {...order} />
              ))}
            </div>
          )}
        </section>

        {!loading && filteredOrders.length > 0 && (
          <Pagination
            totalItems={filteredOrders.length}
            currentPage={currentPage}
            itemsPerPage={ordersPerPage}
            onPageChange={setCurrentPage}
          />
        )}

        
      </div>
    </div>
    <Footer />
   </>
  );
};

export default OrdersPage;
