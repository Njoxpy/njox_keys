import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import { fetchVenueById } from "../../services/venueService";

// qr code plugin
import Html5QrcodePlugin from "../scanner/Html5QrcodePlugin";

const VenueDetailsPage = () => {
  const baseURL = "http://localhost:5000";
  const { by, id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  // 📷 Handle QR scan results
  const onNewScanResult = (decodedText) => {
    console.log("✅ Scanned QR Code:", decodedText);

    // You can POST this to backend or auto-fill a form
    setShowScanner(false); // Hide scanner after success
    alert(`Scanned: ${decodedText}`);
  };

  useEffect(() => {
    const getVenue = async () => {
      try {
        const data = await fetchVenueById(id);
        setVenue(data);
      } catch (error) {
        setError("Failed to load venue details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getVenue();
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Venue Details
          </h1>

          <h2 className="text-2xl font-semibold text-slate-700 mb-6">
            {venue?.name || `Venue ID: ${id}`}
          </h2>

          {by && (
            <p className="text-sm text-slate-500 mb-4 italic">
              Filtered by: <span className="font-medium">{by}</span>
            </p>
          )}

          {loading && <p>Loading venue information...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && venue && (
            <section className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <p className="text-slate-600 mb-6 text-base sm:text-lg leading-relaxed">
                  Block: {venue.block}, Status: {venue.status}, Capacity:{" "}
                  {venue.capacity}, Equipment: {venue.equipment}
                </p>

                <img
                  src={
                    venue.mainImage
                      ? `${baseURL}/uploads/${venue.mainImage}`
                      : "https://via.placeholder.com/600x400"
                  }
                  alt="Main venue"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover shadow-md"
                />
              </div>

              <div className="flex flex-col gap-6 flex-shrink-0 lg:w-[300px]">
                {(venue.images || []).slice(0, 2).map((img, idx) => (
                  <img
                    key={idx}
                    src={`${baseURL}/uploads/${img}`}
                    alt={`Venue detail ${idx + 1}`}
                    width={300}
                    height={190}
                    className="rounded-xl object-cover shadow-md"
                  />
                ))}
              </div>
            </section>
          )}

          {/* QR Request Section */}
          <section className="mt-12 bg-white p-6 rounded-lg shadow border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Request Your Access Key
            </h3>
            <p className="text-slate-600 max-w-xl">
              This system helps universities efficiently manage access keys for
              their facilities, making it simple to track and control who has
              access at any time.
            </p>

            {!showScanner && (
              <button
                onClick={() => setShowScanner(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Request Key
              </button>
            )}

            {showScanner && (
              <div className="mt-6">
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={onNewScanResult}
                />
                <button
                  onClick={() => setShowScanner(false)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Cancel Scan
                </button>
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default VenueDetailsPage;
