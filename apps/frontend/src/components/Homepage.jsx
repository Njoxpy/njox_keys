import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import VenueCard from "./VenueCard";
import OrderedVenueCard from "./OrderedVenueCard";
import Pagination from "./Pagination";
import Footer from "../components/footer";

const mockData = [
  {
    name: "New Lecture Hall (NLH4)",
    block: "Block C",
    image: "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg",
    orderedBy: "Njox Nyagawa",
    orderDate: "2025-05-01T12:00:00Z",
  },
  {
    name: "Computer Science Lab",
    block: "Block A",
    image: "https://images.com/photos/256401/pexels-photo-256401.jpeg",
  },
  {
    name: "Physics Lecture Room",
    block: "Block B",
    image: "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg",
  },
  {
    name: "NLH1",
    block: "Block D",
    image: "https://images.pexels.com/photos/289738/pexels-photo-289738.jpeg",
  },
];

const Homepage = () => {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    setVenues(mockData);
  }, []);

  const filtered = venues.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );
  const available = filtered.filter((v) => !v.orderedBy);
  const ordered = filtered.filter((v) => v.orderedBy);

  const paginatedAvailable = available.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <>
      {/* This div will now take up all available space, pushing the footer down */}
      <div className="flex-1 bg-slate-50 p-6 space-y-10">
        {" "}
        {/* Removed min-h-screen from here */}
        <h1 className="text-2xl font-bold text-slate-800">
          Manage Keys And Access
        </h1>
        <SearchBar search={search} setSearch={setSearch} />
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Available Venues
          </h2>
          <div className="space-y-4">
            {paginatedAvailable.map((venue, idx) => (
              <VenueCard key={idx} venue={venue} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalCount={available.length}
            perPage={perPage}
            onPageChange={setCurrentPage}
          />
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Recently Ordered Venues
          </h2>
          <div className="space-y-4">
            {ordered.map((venue, idx) => (
              <OrderedVenueCard key={idx} venue={venue} />
            ))}
          </div>
          <Pagination
            currentPage={1}
            totalCount={ordered.length}
            perPage={perPage}
            onPageChange={() => {}}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
