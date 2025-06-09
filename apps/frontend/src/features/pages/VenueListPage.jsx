import { useEffect, useState } from "react";
import { fetchVenues } from "../../services/venueService";
import VenueCard from "../venues/VenueCard";
import SearchAndFilterBar from "../venues/SearchAndFilterBar";
import Pagination from "../venues/Pagination";
import Footer from "../../components/footer";

const ITEMS_PER_PAGE = 6;

const VenueListPage = () => {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [blockFilter, setBlockFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const data = await fetchVenues();
        setVenues(data);
      } catch (error) {
        console.error("Failed to fetch venues:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  const filteredVenues = venues
    .filter((venue) => venue.name.toLowerCase().includes(search.toLowerCase()))
    .filter((venue) => (blockFilter ? venue.block === blockFilter : true))
    .filter((venue) => venue.capacity >= capacityFilter)
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const totalPages = Math.ceil(filteredVenues.length / ITEMS_PER_PAGE);
  const paginatedVenues = filteredVenues.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const blocks = [...new Set(venues.map((v) => v.block))];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Venue List</h1>

        <SearchAndFilterBar
          search={search}
          setSearch={setSearch}
          blockFilter={blockFilter}
          setBlockFilter={setBlockFilter}
          capacityFilter={capacityFilter}
          setCapacityFilter={setCapacityFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          blocks={blocks}
        />

        {loading ? (
          <p className="text-center text-slate-500">Loading venues...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedVenues.map((venue) => (
              <VenueCard key={venue._id} venue={venue} />
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </>
  );
};

export default VenueListPage;
