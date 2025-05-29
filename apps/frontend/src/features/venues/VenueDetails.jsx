import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import Footer from "../../components/footer";

const VenueDetailsPage = () => {
  const { by, id } = useParams();

  // Scanner state
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  // onScan now receives an array of detected barcodes
  const handleScan = async (detectedBarcodes) => {
    if (!detectedBarcodes || detectedBarcodes.length === 0) return;

    // We only care about the first detected barcode for now
    const firstBarcode = detectedBarcodes[0];
    const data = firstBarcode.rawValue;

    if (data) {
      setScanResult(data);
      setScanning(false); // stop scanning on successful scan

      // Parse QR code (expects format "year|registrationNumber")
      const [year, regNumber] = data.split("|");
      if (!year || !regNumber) {
        setError("Invalid QR code format");
        setUserInfo(null);
        return;
      }

      try {
        // Fetch user info from backend API
        const res = await fetch(`/api/users/${regNumber}`);
        if (!res.ok) throw new Error("User not found");
        const user = await res.json();
        setUserInfo(user);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch user info");
        setUserInfo(null);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error accessing camera");
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Venue Details
          </h1>

          <h2 className="text-2xl font-semibold text-slate-700 mb-6">
            {id ? `Venue ID: ${id}` : "New Lecture Hall 4 (NLH4)"}
          </h2>

          {by && (
            <p className="text-sm text-slate-500 mb-4 italic">
              Filtered by: <span className="font-medium">{by}</span>
            </p>
          )}

          <section className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <p className="text-slate-600 mb-6 text-base sm:text-lg leading-relaxed">
                Block A, Status: Active, Capacity: 100, Equipment: 100
              </p>

              <img
                src="https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Main venue"
                width={600}
                height={400}
                className="rounded-xl object-cover shadow-md"
                style={{ display: "block" }}
              />
            </div>

            <div className="flex flex-col gap-6 flex-shrink-0 lg:w-[300px]">
              <img
                src="https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Venue detail 1"
                width={300}
                height={190}
                className="rounded-xl object-cover shadow-md"
                style={{ display: "block" }}
              />
              <img
                src="https://images.pexels.com/photos/256297/pexels-photo-256297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Venue detail 2"
                width={300}
                height={190}
                className="rounded-xl object-cover shadow-md"
                style={{ display: "block" }}
              />
            </div>
          </section>

          {/* Request a Key Section */}
          <section className="mt-12 bg-white p-6 rounded-lg shadow border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Request Your Access Key
                </h3>
                <p className="text-slate-600 max-w-xl">
                  This system helps universities efficiently manage access keys
                  for their facilities, making it simple to track and control
                  who has access at any time.
                </p>
              </div>

              {!scanning && (
                <button
                  onClick={() => {
                    setScanning(true);
                    setScanResult(null);
                    setUserInfo(null);
                    setError(null);
                  }}
                  className="self-start sm:self-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Request Key
                </button>
              )}

              {scanning && (
                <div className="w-full max-w-sm">
                  <Scanner
                    scanDelay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%" }}
                    formats={["qr_code"]} // specify QR code only for better accuracy
                  />
                  <button
                    onClick={() => setScanning(false)}
                    className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Cancel Scan
                  </button>
                </div>
              )}
            </div>

            {/* Display scan result & user info */}
            {error && (
              <p className="mt-4 text-red-600 font-semibold">{error}</p>
            )}

            {scanResult && (
              <p className="mt-4 text-green-700 font-semibold">
                Scanned QR: {scanResult}
              </p>
            )}

            {userInfo && (
              <div className="mt-4 bg-gray-100 p-4 rounded border border-gray-300">
                <h4 className="font-semibold text-lg mb-2">User Info:</h4>
                <p>
                  <strong>Name:</strong> {userInfo.name}
                </p>
                <p>
                  <strong>Registration Number:</strong>{" "}
                  {userInfo.registrationNumber}
                </p>
                <p>
                  <strong>Year of Study:</strong> {userInfo.yearOfStudy}
                </p>
                {/* Add more user fields here */}
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
