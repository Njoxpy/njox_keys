import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Building, ArrowRight, AlertCircle } from "lucide-react";
import { fetchVenues } from "../../services/venueService";

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getVenues = async () => {
      try {
        setLoading(true);
        const data = await fetchVenues();
        setVenues(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch venues:", error);

        // Handle authentication errors
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // Redirect to login if unauthorized
          navigate("/login", { state: { from: "/venues" } });
        } else {
          setError("Failed to load venues. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    getVenues();
  }, [navigate]);

  // Filter venues based on search query
  const filteredVenues = venues.filter(
    (venue) =>
      venue.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.block?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Manage Keys and Access
      </h1>

      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search for venues"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 p-2 w-full bg-slate-50 border border-slate-300 text-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-slate-600">Loading venues...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredVenues.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-600">
            {searchQuery
              ? "No venues match your search."
              : "No venues available."}
          </p>
        </div>
      )}

      {/* Venue Grid */}
      {!loading && !error && filteredVenues.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={venue.imageUrl || "/api/placeholder/400/200"}
                alt={venue.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="font-bold text-slate-800">{venue.name}</h2>
                <p className="text-slate-600">Block: {venue.block}</p>
                {venue.status && (
                  <p
                    className={`text-sm ${
                      venue.status === "active"
                        ? "text-green-600"
                        : venue.status === "inactive"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status:{" "}
                    {venue.status.charAt(0).toUpperCase() +
                      venue.status.slice(1)}
                  </p>
                )}
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/venues/${venue.id}`}
                    className="flex items-center text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VenuesPage;
