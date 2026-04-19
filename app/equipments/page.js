export default async function Page({ searchParams }) {
  const { id } = await searchParams;

  if (!id) return <div className="text-white p-10">No ID provided</div>;

  const res = await fetch(`${process.env.UURL}/api/equipments?id=${id}`, {
    next: { revalidate: 30 },
  });
  const data = await res.json();

  if (data.error)
    return <div className="text-white p-10">Error: {data.error}</div>;

  // Formatting current date for the "Date Today" field
  const dateToday = new Date().toLocaleDateString();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(to left, #292832 0%, #141220 50%, #00000b 100%)",
      }}
    >
      <div className="w-full max-w-2xl bg-[#0a0a0c] rounded-lg shadow-2xl p-8 space-y-6">
        {/* Section: Requester's Information */}
        <div className="space-y-4">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded">
            Requester's Information
          </div>
          <div className="bg-[#4a4a4d] p-4 rounded grid grid-cols-2 gap-4 text-sm text-white">
            <div className="flex flex-col">
              <span>
                Name: <span className="text-gray-300 ml-1">[{data.owner}]</span>
              </span>
              <span>
                Position: <span className="text-gray-300 ml-1">[ Staff ]</span>
              </span>
            </div>
            <div className="flex flex-col text-right">
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
        <div className="space-y-4">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded">
            Equipment Request Information
          </div>
          <div className="bg-[#4a4a4d] p-4 rounded text-white space-y-2 text-sm">
            <p>
              <strong>Owner:</strong> {data.owner}
            </p>
            <p>
              <strong>Equipment:</strong> {data.name} ({data.type})
            </p>
            <p className="italic text-gray-300 text-xs">
              Note: {data.note || "No additional notes."}
            </p>
          </div>
        </div>

        {/* Section: Form Fields */}
        <div className="bg-[#606063] p-6 rounded-lg space-y-4">
          {[
            "Purpose of Use",
            "Date & Time of Borrowing",
            "Date & Time of Return",
            "Pickup Location",
            "Return Location",
          ].map((label) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4"
            >
              <label className="text-white font-semibold text-sm whitespace-nowrap">
                {label}
              </label>
              <input
                type="text"
                placeholder="..."
                className="w-2/3 rounded-full px-4 py-1 text-black text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button className="w-full bg-[#8c8c8f] hover:bg-[#a0a0a3] transition-colors text-white text-3xl font-bold py-4 rounded-3xl shadow-lg mt-4">
          Submit Request Form
        </button>

        {/* Metadata Footer (Optional) */}
        <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
          Created: {new Date(data.created_at).toLocaleString()} | Status:{" "}
          {data.status}
        </p>
      </div>
    </div>
  );
}
