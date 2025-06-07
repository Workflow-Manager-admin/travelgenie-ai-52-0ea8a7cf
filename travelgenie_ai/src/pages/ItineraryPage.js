import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * ItineraryPage - Page for generating and viewing AI itineraries
 * Shows a form to collect travel preferences, and displays an AI-generated day-wise itinerary.
 */
function ItineraryPage() {
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: ""
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  /** Handles form field changes */
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // PUBLIC_INTERFACE
  /** Simulates API call to get itinerary; replace with actual API as needed */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError(""); setItinerary(null);

    // Mock AI itinerary: generate example for each day in the range
    try {
      if (!form.destination || !form.startDate || !form.endDate) {
        setLoading(false); return setError("Please complete all fields.");
      }
      const days = [];
      const start = new Date(form.startDate), end = new Date(form.endDate);
      if (end < start) throw new Error("End date must be after start date.");
      for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
        days.push(new Date(d));
      }
      // Fake AI output per day
      const activities = [
        "Explore iconic landmarks & museums.",
        "Enjoy local cuisine and coffee spots.",
        "Discover hidden gems and scenic parks.",
        "Try local markets and souvenir shopping.",
        "Relax at a spa or nearby beach.",
        "Adventure tour, hiking or daytrip."
      ];
      setTimeout(() => {
        setItinerary(days.map((date, idx) => ({
          date: date.toLocaleDateString(),
          highlights: [
            activities[idx % activities.length],
            "Evening walk and dinner at a recommended spot."
          ]
        })));
        setLoading(false);
      }, 1400);
    } catch (err) {
      setLoading(false);
      setError((err && err.message) || "Failed to generate itinerary.");
    }
  }

  return (
    <div className="container" style={{paddingTop:"84px", maxWidth: "580px"}}>
      <h1 className="title" style={{fontSize:"2.2rem",marginBottom: "10px"}}>Itinerary Generator</h1>
      <div className="description" style={{marginBottom:"24px"}}>Tell us your preferences. Get an AI-powered, day-by-day travel itinerary!</div>
      <form className="itinerary-form" 
            style={{display:"flex",flexDirection:"column", gap:"14px",background: "rgba(255,255,255,0.04)",padding:"24px",borderRadius:"14px",marginBottom:"37px"}}
            onSubmit={handleSubmit}>
        <div style={{display: "flex",gap:"10px"}}>
          <input type="text" name="destination" placeholder="Destination (city/country)" value={form.destination} onChange={handleChange}
            style={{flex:1,padding:"10px",borderRadius:"5px",border:"1px solid var(--border-color)"}} autoFocus required />
        </div>
        <div style={{display: "flex", gap:"10px"}}>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required style={{flex:1,padding:"10px",borderRadius:"5px"}} />
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required style={{flex:1,padding:"10px",borderRadius:"5px"}} />
        </div>
        <input type="number" name="budget" placeholder="Budget (USD)" value={form.budget} onChange={handleChange}
          min={0} style={{padding:"10px",borderRadius:"5px"}} />
        <input type="text" name="preferences" placeholder="Interests/Preferences (comma-separated)" 
          value={form.preferences} onChange={handleChange} style={{padding:"10px",borderRadius:"5px"}} />
        <button className="btn btn-large" type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
        {error && <div style={{color:"salmon",marginTop:"7px"}}>{error}</div>}
      </form>
      <div style={{minHeight:30}}>
        {itinerary && (
          <section>
            <h2 style={{margin:"12px 0 8px 0", fontSize:"1.2rem"}}>Your Personalized Itinerary</h2>
            <ol style={{paddingLeft:0,marginTop:'20px', listStyleType:"none" }}>
            {itinerary.map((day, i) => (
              <li key={i} style={{background:"rgba(37, 173, 228, 0.11)",marginBottom:"14px",padding:"13px 18px",borderRadius:"8px"}}>
                <b>Day {i+1}: {day.date}</b>
                <ul style={{margin:"5px 0 0 15px"}}>
                  {day.highlights.map((hl, j)=><li key={j}>{hl}</li>)}
                </ul>
              </li>
            ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}

export default ItineraryPage;
