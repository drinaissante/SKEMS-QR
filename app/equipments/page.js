"use client"; // This must be a client component to handle the popup state

import { useState } from "react";

export default function Page({ data, id }) {
  const [showPopup, setShowPopup] = useState(false);
  const dateToday = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative"
      style={{
        background:
          "linear-gradient(to left, #292832 0%, #141220 50%, #00000b 100%)",
      }}
    >
      <div className="w-full max-w-2xl bg-[#0a0a0c] rounded-lg shadow-2xl p-4 sm:p-8 space-y-6">
        {/* Requester's Info Section */}
        <div className="space-y-2 sm:space-y-4">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded text-sm sm:text-base">
            Requester's Information
          </div>
          <div className="bg-[#4a4a4d] p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs sm:text-sm text-white">
            <div className="flex flex-col space-y-1">
              <span>
                Name:{" "}
                <span className="text-blue-300 ml-1 font-mono">
                  [{data.owner}]
                </span>
              </span>
              <span>
                Position:{" "}
                <span className="text-blue-300 ml-1 font-mono">[ Staff ]</span>
              </span>
            </div>
            <div className="flex flex-col md:text-right space-y-1 border-t border-gray-500 pt-2 md:border-none md:pt-0">
              <span>
                Date:{" "}
                <span className="text-blue-300 ml-1 font-mono">
                  {dateToday}
                </span>
              </span>
              <span>
                Contact No:{" "}
                <span className="text-blue-300 ml-1 font-mono">[ N/A ]</span>
              </span>
            </div>
          </div>
        </div>

        {/* Equipment Info Section */}
        <div className="space-y-2 sm:space-y-4">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded text-sm sm:text-base">
            Equipment Request Information
          </div>
          <div className="bg-[#4a4a4d] p-4 rounded text-white space-y-2 text-xs sm:text-sm">
            <p>
              <strong>Owner:</strong> {data.owner}
            </p>
            <p>
              <strong>Equipment:</strong> {data.name} ({data.type})
            </p>
            <div className="bg-[#2a2a2d] p-3 border-l-4 border-blue-500 rounded mt-2">
              <p className="italic text-gray-300">
                Note: {data.note || "No additional notes."}
              </p>
            </div>
          </div>
        </div>

        {/* High-Visibility Form Fields */}
        <div className="bg-[#606063] p-4 sm:p-6 rounded-lg space-y-4">
          {[
            "Purpose of Use",
            "Date & Time of Borrowing",
            "Date & Time of Return",
            "Pickup Location",
            "Return Location",
          ].map((label) => (
            <div
              key={label}
              className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-4"
            >
              <label className="text-white font-bold text-xs sm:text-sm drop-shadow-md">
                {label}
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full md:w-2/3 rounded-full px-4 py-2 bg-white text-black border-2 border-blue-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-4 focus:ring-blue-400 font-medium"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#8c8c8f] hover:bg-blue-600 hover:text-white transition-all text-white text-xl sm:text-3xl font-black py-4 rounded-2xl sm:rounded-3xl shadow-[0_4px_0_rgb(80,80,80)] active:translate-y-1 active:shadow-none mt-4"
        >
          Submit Request Form
        </button>
      </div>

      {/* Popup Modal Overlay */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-[#272530] border-2 border-blue-500 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="text-blue-400 text-5xl">✓</div>
            <h2 className="text-white text-2xl font-bold">Request Sent!</h2>
            <p className="text-gray-300 text-sm">
              Your equipment request for <strong>{data.name}</strong> has been
              submitted successfully for approval.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-8 py-2 rounded-full font-bold hover:bg-blue-500 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
