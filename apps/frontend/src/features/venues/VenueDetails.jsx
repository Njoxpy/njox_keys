import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer";

const VenueDetailsPage = () => {
  const { by, id } = useParams();

  return (
    <>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
          {/* Venue Details Heading */}
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
            Venue Details
          </h1>

          {/* Dynamic Venue Name */}
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">
            {id ? `Venue ID: ${id}` : "New Lecture Hall 4 (NLH4)"}
          </h2>

          {/* Show "by" param if present */}
          {by && (
            <p className="text-sm text-slate-500 mb-4 italic">
              Filtered by: <span className="font-medium">{by}</span>
            </p>
          )}

          {/* Venue Info & Images Section */}
          <section className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <p className="text-slate-600 mb-6 text-base sm:text-lg leading-relaxed">
                Block A, Status: Active, Capacity: 100, Equipment: 100
              </p>

              {/* Large main image with fixed size */}
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
              {/* Smaller image 1 fixed size */}
              <img
                src="https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Venue detail 1"
                width={300}
                height={190}
                className="rounded-xl object-cover shadow-md"
                style={{ display: "block" }}
              />
              {/* Smaller image 2 fixed size */}
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

              <button
                onClick={() => alert("Request Key Clicked!")}
                className="self-start sm:self-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Request Key
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default VenueDetailsPage;
