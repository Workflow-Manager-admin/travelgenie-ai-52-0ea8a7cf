import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * HomePage - Main landing page for TravelGenie AI with navigation links
 */
function HomePage() {
  return (
    <div className="container" style={{paddingTop: "72px", minHeight:"80vh"}}>
      <div className="hero">
        <div className="subtitle">Your Personal AI-Powered Travel Planner</div>
        <h1 className="title" style={{marginBottom: "8px"}}>Welcome to TravelGenie AI</h1>
        <div className="description" style={{marginBottom:"36px"}}>
          Plan smarter, travel better. Get instant AI-powered travel itineraries, weather updates, and guidance for every journey.
        </div>
        <nav style={{display:"flex", gap:"18px", flexWrap:"wrap", marginBottom:'12px', justifyContent:"center"}}>
          <Link to="/itinerary" className="btn btn-large" style={{minWidth:128}}>Itinerary Generator</Link>
          <Link to="/weather" className="btn btn-large" style={{minWidth:128, background: "var(--base-dark)", color:"var(--base-light)", border: "1px solid var(--base-light)"}}>Weather Checker</Link>
          <Link to="/chat" className="btn btn-large" style={{minWidth:128}}>Travel Chatbot</Link>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;
