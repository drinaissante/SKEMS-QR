export default async function Page({ searchParams }) {
  const { id } = await searchParams;

  if (!id)
    return <div className="text-white p-10 text-center">No ID provided</div>;

  const res = await fetch(`${process.env.UURL}/api/equipments?id=${id}`, {
    next: { revalidate: 30 },
  });
  const data = await res.json();

  if (data.error)
    return (
      <div className="text-white p-10 text-center">Error: {data.error}</div>
    );

  const dateToday = new Date().toLocaleDateString();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 sm:p-4"
      style={{
        background:
          "linear-gradient(to left, #292832 0%, #141220 50%, #00000b 100%)",
      }}
    >
      {/* Container: Max width on desktop, full width on mobile */}
      <div className="w-full max-w-2xl bg-[#0a0a0c] rounded-lg shadow-2xl p-4 sm:p-8 space-y-6">
        {/* Section: Requester's Information */}
        <div className="space-y-2 sm:space-y-4">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded text-sm sm:text-base">
            Requester's Information
          </div>
          <div className="bg-[#4a4a4d] p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs sm:text-sm text-white">
            <div className="flex flex-col space-y-1">
              <span>
                Name: <span className="text-gray-300 ml-1">[{data.owner}]</span>
              </span>
              <span>
                Position: <span className="text-gray-300 ml-1">[ Staff ]</span>
              </span>
            </div>
            <div className="flex flex-col md:text-right space-y-1 border-t border-gray-500 pt-2 md:border-none md:pt-0">
              <span>
                Date: <span className="text-gray-300 ml-1">{dateToday}</span>
              </span>
              <span>
                Contact No: <span className="text-gray-300 ml-1">[ N/A ]</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section: Equipment Request Information */}
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
            <div className="bg-[#3a3a3d] p-2 rounded mt-2">
              <p className="italic text-gray-300">
                Note: {data.note || "No additional notes."}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Interactive Form Fields */}
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
              <label className="text-white font-semibold text-xs sm:text-sm whitespace-nowrap">
                {label}
              </label>
              <input
                type="text"
                placeholder="..."
                className="w-full md:w-2/3 rounded-full px-4 py-2 text-black text-center focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Responsive Submit Button */}
        <button className="w-full bg-[#8c8c8f] hover:bg-[#a0a0a3] active:scale-95 transition-all text-white text-xl sm:text-3xl font-bold py-4 rounded-2xl sm:rounded-3xl shadow-lg mt-4">
          Submit Request Form
        </button>

        {/* Meta Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest gap-2">
          <span>Status: {data.status}</span>
          <span>ID: {id}</span>
          <span>Created: {new Date(data.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
