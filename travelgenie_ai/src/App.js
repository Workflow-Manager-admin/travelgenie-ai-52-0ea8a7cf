import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import HomePage from './pages/HomePage';
import ItineraryPage from './pages/ItineraryPage';
import WeatherPage from './pages/WeatherPage';
import ChatPage from './pages/ChatPage';

// PUBLIC_INTERFACE
/** Main App component, includes navigation and routes for core app pages */
function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container" style={{width:'100%'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Link to="/" className="logo" style={{textDecoration:'none',color:'inherit'}}> 
                <span className="logo-symbol" style={{color:"var(--base-light)", fontWeight:700}}>&#9733;</span>
                TravelGenie AI
              </Link>
              <div style={{display:"flex",gap:"10px"}}>
                <Link to="/itinerary" className="btn" style={{padding:"7px 16px"}}>Itinerary</Link>
                <Link to="/weather" className="btn" style={{padding:"7px 16px", background: "var(--base-dark)", color:"var(--base-light)", border: "1px solid var(--base-light)"}}>Weather</Link>
                <Link to="/chat" className="btn" style={{padding:"7px 16px"}}>Chat</Link>
              </div>
            </div>
          </div>
        </nav>
        <main style={{flex:1}}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;