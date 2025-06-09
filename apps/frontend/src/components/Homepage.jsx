import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import VenueCard from "./VenueCard";
import OrderedVenueCard from "./OrderedVenueCard";
import Pagination from "./Pagination";
import Footer from "../components/footer";
import { fetchVenues } from "../services/venueService";

const Homepage = () => {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
      } catch (error) {
        console.error("❌ Failed to fetch venues:", error);
        // Optional: display an error message or show empty state
      }
    };
    fetchData();
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
      <div className="flex-1 bg-slate-50 p-6 space-y-10">
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
              <VenueCard key={venue._id || idx} venue={venue} />
            ))}
          </div>
          <Pagination
            currentPage={1}
            totalCount={ordered.length}
            perPage={perPage}
            onPageChange={() => {}}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Recently Ordered Venues
          </h2>

          {ordered.length === 0 ? (
            <p className="text-slate-500">No ordered venues found.</p>
          ) : (
            <div className="space-y-4">
              {ordered.map((venue, idx) => (
                <OrderedVenueCard key={venue._id || idx} venue={venue} />
              ))}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
