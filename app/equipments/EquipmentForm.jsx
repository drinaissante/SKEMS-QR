"use client";

import { useEffect, useState } from 'react';

export default function EquipmentForm({ data, id }) {
  const [showPopup, setShowPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const inputClass = "w-full md:w-2/3 rounded-full px-5 py-2 bg-white text-black border-2 border-yellow-900 shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(0,0,0,0.2)] focus:ring-4 focus:ring-yellow-500/50 outline-none transition-all font-semibold text-sm";

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 relative font-sans" 
         style={{ background: 'linear-gradient(to left, #292832 0%, #141220 50%, #00000b 100%)' }}>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#0a0a0c] rounded-xl shadow-2xl p-4 sm:p-8 space-y-6 border border-white/5">
        
        {/* SECTION 1: Requester's Information (INPUTS) */}
        <div className="space-y-3">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded shadow-inner uppercase tracking-wider text-xs sm:text-sm">
            Requester's Information
          </div>
          <div className="bg-[#4a4a4d] p-5 rounded-lg space-y-4 border border-white/10 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <label className="text-white font-bold text-xs uppercase">Full Name:</label>
              <input required type="text" placeholder="Your Name" className={inputClass} />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <label className="text-white font-bold text-xs uppercase">Position:</label>
              <input required type="text" placeholder="e.g. Staff / Student" className={inputClass} />
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <label className="text-white font-bold text-xs uppercase">Contact No:</label>
              <input required type="text" placeholder="09XX XXX XXXX" className={inputClass} />
            </div>
            <div className="pt-2 text-[10px] text-yellow-300 font-mono text-right italic" suppressHydrationWarning>
              Form Accessed: {mounted ? new Date().toLocaleString() : "--/--/----"}
            </div>
          </div>
        </div>

        {/* SECTION 2: Equipment Request Information (READ ONLY) */}
        <div className="space-y-3">
          <div className="bg-[#606063] text-white text-center py-1 font-bold rounded shadow-inner uppercase tracking-wider text-xs sm:text-sm">
            Equipment Details
          </div>
          <div className="bg-[#4a4a4d] p-4 rounded-lg text-white space-y-2 text-xs sm:text-sm border border-white/10">
            <div className="grid grid-cols-2 gap-y-2">
              <span className="text-gray-400 uppercase font-bold text-[10px]">Equipment:</span>
              <span className="text-right font-semibold">{data.name}</span>
              
              <span className="text-gray-400 uppercase font-bold text-[10px]">Type:</span>
              <span className="text-right font-semibold">{data.type}</span>
              
              <span className="text-gray-400 uppercase font-bold text-[10px]">Registered Owner:</span>
              <span className="text-right font-semibold text-yellow-300">{data.owner}</span>
            </div>
            <div className="mt-3 p-3 bg-black/30 rounded border-l-4 border-yellow-500 italic text-gray-400">
              Admin Note: {data.notes || "No additional notes provided."}
            </div>
          </div>
        </div>

        {/* SECTION 3: Logistics (INPUTS) */}
        <div className="bg-[#606063] p-4 sm:p-6 rounded-xl space-y-5 shadow-inner">
          {[
            "Purpose of Use",
            "Date & Time of Borrowing",
            "Date & Time of Return",
            "Pickup Location",
            "Return Location"
          ].map((label) => (
            <div key={label} className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
              <label className="text-white font-black text-xs sm:text-sm drop-shadow-md uppercase tracking-tight">
                {label}
              </label>
              <input required type="text" placeholder="Enter information here" className={inputClass} />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full bg-[#8c8c8f] hover:bg-yellow-600 hover:text-white transition-all text-white text-xl sm:text-3xl font-black py-5 rounded-2xl sm:rounded-[2rem] shadow-[0_6px_0_rgb(60,60,60)] active:translate-y-1 active:shadow-[0_2px_0_rgb(60,60,60)] uppercase"
        >
          Submit Request Form
        </button>
      </form>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowPopup(false)} />
          <div className="relative bg-[#1c1b27] border-2 border-orange-500 p-8 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)] max-w-sm w-full text-center space-y-5">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-yellow-500/40">
              <span className="text-white text-3xl font-bold">✓</span>
            </div>
            <h2 className="text-white text-2xl font-black uppercase tracking-tight">Request Logged</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your request for <strong>{data.name}</strong> has been sent to <strong>{data.owner}</strong> for approval.
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}